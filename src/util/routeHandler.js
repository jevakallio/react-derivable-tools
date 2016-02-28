/* Code copied from https://github.com/ds300/derivablejs/tree/master/examples/routing */
/***

# Router

This file will walk you through the implemetation of a simple but powerful
routing system with DerivableJS. It is structured in two parts:

1. Data and Functions
2. Reactive Glue

The first section doesn't involve using Derivables at all, but rather shows how to
go about designing all the individual components of a routing system from a functional perspective.
It is written for anyone with JS experience, but if you've done any functional programming with immutable data before it should be *really* easy to follow.

Part 2 shows how to take the inert functional system designed in Part 1, and turn it into a living breathing thing using Derivables.

## Part 1: Data and Functions

The top-level piece of data is the hash fragment at the end of a url. e.g. the url `https://ds300.github.com/#this-is-a-hash-fragment` has a hash fragment `'#this-is-a-hash-fragment'`, and the url `https://ds300.github.com/` has a hash fragment `''`.

We are essentially building a function which transforms a hash fragment into a DOM tree.

To begin, let's examine the types of hash fragments we will be looking at:

- Routes: `'#/some/route'`, `'#/'`, `'#'`, `''`, `'#/another/longer/route'`
- Routes + Query Params: `'#/some/route/with?a=param'`, `'#/?name=value&boolean_flag'`

It seems like we want to split the hash fragment into two parts: the route part and the query part. These are cleverly separated by a question mark.

At the same time we can get rid of the `#` character if present because it doesn't mean anything at this stage.

***/
function splitHash(hash) {
    var queryIdx = hash.indexOf("?");
    if (queryIdx < 0) {
        return [hash.slice(1), ""];
    }
    else {
        return [hash.slice(1, queryIdx), hash.slice(queryIdx + 1)];
    }
}
/***

The next step is to parse the route and query parts into more useful forms.

To do this I'm going to use the `List` and `Map` classes from facebook's [immutable](https://facebook.github.io/immutable-js/) library.

***/
var immutable_1 = require('immutable');
var notEmpty = function (x) { return x !== ''; };
function parseRouteString(route) {
    return immutable_1.List(route.split('/').filter(notEmpty));
}

function parseQueryString(query) {
    var result = immutable_1.Map().asMutable();
    var parts = query.split("&").filter(notEmpty);
    for (var _i = 0; _i < parts.length; _i++) {
        var part = parts[_i];
        var equalsIdx = part.indexOf("=");
        if (equalsIdx >= 0) {
            result.set(part.slice(0, equalsIdx), part.slice(equalsIdx + 1));
        }
        else {
            result.set(part, true);
        }
    }
    return result.asImmutable();
}

/***

Unfortunately TypeScript doesn't allow recursive type aliases,
otherwise that `any` at the end there would be `DispatchTree<Handler>`

Because we know our `Route`s will never have the empty string as one of their
constituent parts, we can use the empty string as the key for the handler at a
particular location in the nested map structure.

e.g. the `DispatchTree` containing routes `/a` `/a/b`, `/a/c`, and `/d` would look like the following:

```json
{
  "a": {
    "b": {"": "b handler"},
    "c": {"": "c handler"},
    "": "a handler"
  },
  "d": {"": "d handler"}
}
```

***/
export function register(tree, path, handler) {
    var route = parseRouteString(path).push('');
    return tree.setIn(route, handler);
}

/***

If you've ever used modern routing libraries like [sinatra](http://www.sinatrarb.com/),
[compojure](https://github.com/weavejester/compojure), [klein](https://github.com/chriso/klein.php),
[jersey](https://jersey.java.net/documentation/latest/jaxrs-resources.html),
and about a million others, you're probably familiar with the notion of a *path parameter*.

Path params let one define parts of a path which are variable and assigned to a named parameter
for consumption by the matched handler.

e.g. a handler registered with the path `'resource/:id/stats'` will be matched
against the route `resource/51/stats`, and might render a page
which shows statistics about some kind of resource with id `51`.

***/

/***

So when we retrieve a handler, we also need to retrieve any matched path params.

***/
export function lookup(tree, params, route) {
    var part = route.first();
    var child = tree.get(part);
    if (child) {
        if (part === '') {
            // child is the matched handler
            return [child, params];
        }
        else {
            // child is nested dispatch tree
            return lookup(child, params, route.shift());
        }
    }
    else {
        // child not found so look for path param
        var paramKeys = tree.keySeq()
            .filter(function (k) { return k.indexOf(':') === 0; })
            .toArray();
        for (var _i = 0; _i < paramKeys.length; _i++) {
            var k = paramKeys[_i];
            // extract the path param
            var paramsWithK = params.set(k.slice(1), route.first());
            // keep looking recursively to find a handler
            var result = lookup(tree.get(k), paramsWithK, route.shift());
            // if a handler was found, we can just return it
            if (result !== null) {
                return result;
            }
        }
    }
    return null;
}

/***

Believe it or not, we now have all the functional building blocks we need.
All we're doing is turning a hash fragment and a dispatch tree into a 'handler' and a set of params.

Here's what that looks like as one big function:

***/
export function getHandler(tree, hash) {
    var _a = splitHash(hash), path = _a[0], queryString = _a[1];
    var route = parseRouteString(path).push('');
    var queryParams = parseQueryString(queryString);
    return lookup(tree, queryParams, route) || [null, queryParams];
}

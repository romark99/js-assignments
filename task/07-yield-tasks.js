'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
    let i = 99;
    while (i > 2) {
        yield String(i) + " bottles of beer on the wall, " + String(i) + " bottles of beer.";
        yield "Take one down and pass it around, " + String(i - 1) + " bottles of beer on the wall.";
        i--;
    }
    yield '2 bottles of beer on the wall, 2 bottles of beer.';
    yield 'Take one down and pass it around, 1 bottle of beer on the wall.';
    yield '1 bottle of beer on the wall, 1 bottle of beer.';
    yield 'Take one down and pass it around, no more bottles of beer on the wall.';
    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
    yield 0;
    yield 1;
    let arr = [0, 1];
    while (true) {
        let sum = arr[0] + arr[1];
        yield sum;
        arr[0] = arr[1];
        arr[1] = sum;
    }
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {
    // function* func(node) {
    //     yield node;
    //     if (node.children>0) {
    //         for (let i = 0; i < node.children.length; i++) {
    //             let foo=func(node.children[i]);
    //             for(;;) {
    //                 let y = foo(node.children[i]).next();
    //                 if (!y)
    //                     break;
    //                 else
    //                     yield y;
    //             }
    //         }
    //     }
    // }
    // for (;;) {
    //     let y = func(root).next();
    //     if (!y)
    //         break;
    //     else
    //         yield y;
    // }
    //
    // let nodes = [];
    // nodes.push(root);
    // while (nodes.length>0) {
    //     let node = nodes.pop();
    //     yield node;
    //     if (!!node.children) {
    //         for (let i=node.children.length-1; i>=0; i++) {
    //             nodes.push(node.children[i]);
    //         }
    //     }
    // }
    //
    // yield root;
    // if (root.children.length>0) {
    //     for (let i=0; i<root.children.length; i++)
    //         yield * depthTraversalTree(root.children[i]);
    // }
    let stack = [];
    stack.push(root);
    while (stack.length>0) {
        let node = stack.pop();
        yield node;
        if (node.children!==undefined) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
}


/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
    let queue = [];
    queue.push(root);
    while (queue.length>0) {
        let qq=queue.length;
        for (let i=0; i<qq; i++) {
            yield queue[i];
        }
        let arr=[];
        for (let i=0; i<qq; i++) {
            if (queue[i].children!==undefined) {
                arr.push(...queue[i].children);
            }
        }
        queue=arr;
    }
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {
    let src1 = source1();
    let src2 = source2();
    let a = src1.next().value;
    let b = src2.next().value;
    while (1) {
        if (a < b) {
            yield a;
            let iter = src1.next();
            a = iter.value;
            if (iter.done === true) {
                while (1) {
                    yield b;
                    let itr = src2.next();
                    b = itr.value;
                    if (itr.done === true) {
                        break;
                    }
                }
                break;
            }
        }
        else {
            yield b;
            let iter = src2.next();
            b = iter.value;
            if (iter.done === true) {
                while (1) {
                    yield a;
                    let itr = src1.next();
                    a = itr.value;
                    if (itr.done === true) {
                        break;
                    }
                }
                break;
            }
        }
    }
}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences
};

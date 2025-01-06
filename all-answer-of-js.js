////Q1: Given the code defined below, can you identify two problems?

// Answer: there is lots of code issue. measure 2 issue bellow:-
// 1) Formatting and Import synnex error:
// @ synnex error--
// i) Incorrect parentheses amd brackets in the contractor definition.
// ii) refs property name has spaces in ref="MyComponentDiv", which is invalid.
// iii) missing supper props in the constructor when extending React.Component.
// 2) Deprecated Lifecycle Method.





////Q2: What's wrong with that code? Also write the correct code? 
this.setState((prevState) => ({
    counter: prevState.counter + this.props.increment,
}))
//explanation:
// 1) The prevState parameter ensure you're  working with the latest state, avoiding race conditions.
// 2) Since React batches updates for performance, this.state.counter may not have the most up - to - date value at the time  of the setState call.




//// Q4a: Write a code to reverse a string without using a third variable?
const reverseString = (str) => {
    const arr = str.split('');
    for (let i = 0, j = str.length - 1; i < j; i++, j--) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.join('')
}

console.log(reverseString('hello'));




//// Q4b: Write a code to swap two numbers without using a third variable?
let a = 2;
let b = 3;
a = a + b;
b = a - b;
a = a - b;
console.log("a=",a, "b=",b);


//// Q5: Find second largest number in an array ?
const largestNumberInAnArray = (arr) => {
    let [largest, secondLargest] = [-Infinity, -Infinity];
    for (let num of arr) {
        if (num > largest) {
            [largest, secondLargest] = [num, largest];
        } else if (num > secondLargest && num !== largest) {
            return secondLargest = num;
        }
    }
    return secondLargest;
}
console.log(largestNumberInAnArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));





//// Q10: Optimizing a Query

// Prompt:
// You have a collection orders in MongoDB with millions of records.Each record has the fields:
// id, user_id, product_id, quantity, and order_date.

// Write a MongoDB query to:
// Find the top 5 products with the highest sales(quantity summed up).
// Optimize the query with appropriate indexes.


// Answer:
// using aggregate
db.orders.aggregate([
    { $group: { _id: 'product_id', totalQuantity: { $sum: '$quantity' } } },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },
]).explain('executionStates');

// using index
    db.orders.createIndex({product_id:1,quantity:1})


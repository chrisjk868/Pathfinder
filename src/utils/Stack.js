class Node {
    constructor(value = null, next_element = null) {
        this.val = value;
        this.next = next_element;
    }
}

class Stack {
    // Constructor
    constructor() {
        this.head = null;
        this.length = 0;
    }
 
    // Put an item on the top of the stack
    push(data) {
        this.head = new Node(data, this.head);
        this.length += 1;
    }
 
    // Return the top position of the stack
    pop() {
        if (this.length === 0) {
            return null;
        } else {
            let returned = this.head.val;
            this.head = this.head.next;
            this.length -= 1;
            return returned;
        }
    }

    // Return the top position of the stack
    top() {
        return this.head.val;
    }
 
    // Return False if the stack is empty 
    // and true otherwise
    isEmpty() {
        return !Boolean(this.length);    
    }
}

export default Stack;
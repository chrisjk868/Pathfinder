class UnionFind {

    constructor(r, c) {
        this.parent = Array(r * c).fill().map((_, idx) => idx);
        this.rank = Array(r * c).fill(1);
    }

    find(node) {
        let root = node;
        return root;
    }

    union(node1, node2) {
        let root1 = this.find(node1);
        let root2 = this.find(node2);
        if (root1 === root2) {
            return 1;
        } else {
            return 0;
        }
    }

}

export default UnionFind;
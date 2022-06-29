import { Queue } from './Queue.mjs'
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};
const initializeColor = vertices => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};
class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new Map();
    }

    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v)
            this.adjList.set(v, [])
        }
    }

    addEdge(v, w) {
        if (!this.adjList.has(v)) {
            this.addVertex(v)
        }
        if (!this.adjList.has(w)) {
            this.addVertex(w)
        }
        this.adjList.get(v).push(w)
        if (!this.isDirected) {
            this.adjList.get(w).push(v)
        }
    }

    breadthFirstSearch(startVertex, callback) {
        if (this.adjList.has(startVertex)) {
            const color = initializeColor(this.vertices)
            const queue = new Queue()
            queue.enqueue(startVertex)
            color[startVertex] = Colors.GREY
            while (!queue.isEmpty()) {
                let v = queue.dequeue()
                color[v] = Colors.GREY
                const neighbors = this.adjList.get(v)
                for (let i = 0; i < neighbors.length; i++) {
                    let w = neighbors[i]
                    if (color[w] === Colors.WHITE) {
                        color[w] = Colors.GREY;
                        queue.enqueue(w)
                    }
                }
                if (callback) {
                    callback(v)
                }
                color[v] = Colors.BLACK
            }
        }
    }

    depthFirstSearch(callback){
        const vertices = this.vertices
        const adjList = this.adjList
        const color = initializeColor(this.vertices)
        for(let i = 0;i<vertices.length;i++){
            const v = vertices[i]
            if(color[v]===Colors.WHITE){
                this.#depthFirstSearchVisit(color,v,callback)
            }
        }
    }
    #depthFirstSearchVisit(color,v,callback){
        color[v] = Colors.GREY
        if(callback){
            callback(v)
        }
        const neighbors = this.adjList.get(v)
        for(let i = 0;i<neighbors.length;i++){
            const w = neighbors[i]
            if(color[w] === Colors.WHITE){
                this.#depthFirstSearchVisit(color,w,callback)
            }
        }
        color[v] = Colors.BLACK
    }
    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }
    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += `${neighbors[j]} `;
            }
            s += '\n';
        }
        return s;
    }
}

export { Graph }
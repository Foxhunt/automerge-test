import * as Automerge from 'automerge'

type State = {
    nodes: Automerge.List<Node>
}

type Node = {
    name: string
    position: [number, number]
}

let localState = Automerge.from<State>({ nodes: [] })

let remoteState = Automerge.init<State>()
remoteState = mergeDocs(remoteState, localState)

const localDoc = new Automerge.WatchableDoc(localState)

localDoc.registerHandler(doc => console.dir(doc))

function addNode(
    state: Automerge.FreezeObject<State>,
    node: Node
): Automerge.FreezeObject<State> {
    const newState = Automerge.change(state, "addNode", doc => {
        doc.nodes.push(node)
    })

    return newState
}

function getChanges(
    oldState: Automerge.FreezeObject<State>,
    newState: Automerge.FreezeObject<State>
): Automerge.Change[] {
    return Automerge.getChanges(oldState, newState)
}

function applyChanges(
    state: Automerge.FreezeObject<State>,
    changes: Automerge.Change[]
): Automerge.FreezeObject<State> {
    return Automerge.applyChanges(state, changes)
}

function mergeDocs(
    local: Automerge.FreezeObject<State>,
    remo: Automerge.FreezeObject<State>
): Automerge.FreezeObject<State> {
    return Automerge.merge(local, remo)
}

console.log("localstate", localState.nodes.length)
console.log("remoteState", remoteState.nodes.length)



// change local state
let newLocalState = addNode(localState, { name: "node", position: [0, 0] })
let changes = getChanges(localState, newLocalState)

// apply initial changes to
let newRemoteState = applyChanges(remoteState, changes)

localState = newLocalState
remoteState = newRemoteState

console.log("localstate", newLocalState.nodes.length)
console.log("remoteState", newRemoteState.nodes.length)



// change local state
newLocalState = addNode(localState, { name: "node0", position: [0, 0] })
changes = getChanges(localState, newLocalState)

// apply to remoteState
newRemoteState = applyChanges(remoteState, changes)

localState = newLocalState
remoteState = newRemoteState

console.log("localstate", newLocalState.nodes.length)
console.log("remoteState", newRemoteState.nodes.length)




// change local state
newLocalState = addNode(localState, { name: "node00", position: [0, 0] })

for (let i = 0; i < 20; i++) {
    newLocalState = addNode(newLocalState, { name: "node" + i, position: [0, 0] })
}

changes = getChanges(localState, newLocalState)

// apply to remoteStates
newRemoteState = applyChanges(remoteState, changes)

localState = newLocalState
remoteState = newRemoteState

console.log("localstate", newLocalState.nodes.length)
console.log("remoteState", newRemoteState.nodes.length)

// const history = Automerge.getHistory(localState)

// history.forEach(state => {
//     console.dir(state.snapshot)
// })

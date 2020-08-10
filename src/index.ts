import * as Automerge from 'automerge'

type state = {
    cards: Automerge.List<card>
}

type card = {
    title: string
    done: boolean
}

let localState = Automerge.from<state>({ cards: [] })

let remoteState = Automerge.init<state>()
remoteState = mergeDocs(remoteState, localState)

function addCard(
    state: Automerge.FreezeObject<state>,
    card: card
): Automerge.FreezeObject<state> {
    const newState = Automerge.change(state, "addCard", doc => {
        doc.cards.push(card)
    })

    return newState
}

function getChanges(
    oldState: Automerge.FreezeObject<state>,
    newState: Automerge.FreezeObject<state>
): Automerge.Change[] {
    return Automerge.getChanges(oldState, newState)
}

function applyChanges(
    state: Automerge.FreezeObject<state>,
    changes: Automerge.Change[]
): Automerge.FreezeObject<state> {
    return Automerge.applyChanges(state, changes)
}

function mergeDocs(
    local: Automerge.FreezeObject<state>,
    remo: Automerge.FreezeObject<state>
): Automerge.FreezeObject<state> {
    return Automerge.merge(local, remo)
}

console.log("localstate", localState.cards.length)
console.log("remoteState", remoteState.cards.length)



// change local state
let newLocalState = addCard(localState, { title: "card1", done: false })
let changes = getChanges(localState, newLocalState)

// apply initial changes to
let newRemoteState = applyChanges(remoteState, changes)

localState = newLocalState
remoteState = newRemoteState

console.log("localstate", newLocalState.cards.length)
console.log("remoteState", newRemoteState.cards.length)



// change local state
newLocalState = addCard(localState, { title: "card1", done: false })
changes = getChanges(localState, newLocalState)

// apply to remoteState
newRemoteState = applyChanges(remoteState, changes)

localState = newLocalState
remoteState = newRemoteState

console.log("localstate", newLocalState.cards.length)
console.log("remoteState", newRemoteState.cards.length)




// change local state
newLocalState = addCard(localState, { title: "card1", done: false })
newLocalState = addCard(newLocalState, { title: "card1", done: false })
newLocalState = addCard(newLocalState, { title: "card1", done: false })
newLocalState = addCard(newLocalState, { title: "card1", done: false })
changes = getChanges(localState, newLocalState)

// apply to remoteState
newRemoteState = applyChanges(remoteState, changes)

localState = newLocalState
remoteState = newRemoteState

console.log("localstate", newLocalState.cards.length)
console.log("remoteState", newRemoteState.cards.length)

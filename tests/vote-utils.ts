import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Voted } from "../generated/Vote/Vote"

export function createVotedEvent(
  _from: Address,
  _propositionIndex: BigInt,
  _proposals: Array<ethereum.Tuple>,
  _startVotingTime: BigInt,
  _endVotingTime: BigInt
): Voted {
  let votedEvent = changetype<Voted>(newMockEvent())

  votedEvent.parameters = new Array()

  votedEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  votedEvent.parameters.push(
    new ethereum.EventParam(
      "_propositionIndex",
      ethereum.Value.fromUnsignedBigInt(_propositionIndex)
    )
  )
  votedEvent.parameters.push(
    new ethereum.EventParam(
      "_proposals",
      ethereum.Value.fromTupleArray(_proposals)
    )
  )
  votedEvent.parameters.push(
    new ethereum.EventParam(
      "_startVotingTime",
      ethereum.Value.fromUnsignedBigInt(_startVotingTime)
    )
  )
  votedEvent.parameters.push(
    new ethereum.EventParam(
      "_endVotingTime",
      ethereum.Value.fromUnsignedBigInt(_endVotingTime)
    )
  )

  return votedEvent
}

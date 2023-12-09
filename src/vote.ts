import { Voted as VotedEvent } from "../generated/Vote/Vote"
import { Voted } from "../generated/schema"

export function handleVoted(event: VotedEvent): void {
  let entity = new Voted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._from = event.params._from
  entity._propositionIndex = event.params._propositionIndex
  entity._proposals = event.params._proposals
  entity._startVotingTime = event.params._startVotingTime
  entity._endVotingTime = event.params._endVotingTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

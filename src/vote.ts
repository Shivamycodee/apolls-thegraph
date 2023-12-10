import { BigInt } from "@graphprotocol/graph-ts";
import { Voted as VotedEvent } from "../generated/Vote/Vote"
import { Voted, EntityVoteCollected } from "../generated/schema";

export function handleVoted(event: VotedEvent): void {
  let entity = new Voted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.description = event.params.description;
  entity._startVotingTime = event.params._startVotingTime
  entity._endVotingTime = event.params._endVotingTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash


  let userID = entity.description;
  let entityVoteCollected = EntityVoteCollected.load(userID);

  if(!entityVoteCollected){
    let entityVoteCollected = new EntityVoteCollected(userID);
    entityVoteCollected.entity = entity.description;
    entityVoteCollected.voteCount = BigInt.fromI32(1);
    entityVoteCollected.save();
  }else{
    entityVoteCollected.voteCount = entityVoteCollected.voteCount.plus(BigInt.fromI32(1));
    entityVoteCollected.save();
  }
  entity.save()
}

import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Voted } from "../generated/schema"
import { Voted as VotedEvent } from "../generated/Vote/Vote"
import { handleVoted } from "../src/vote"
import { createVotedEvent } from "./vote-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _from = Address.fromString("0x0000000000000000000000000000000000000001")
    let _propositionIndex = BigInt.fromI32(234)
    let _proposals = ["ethereum.Tuple Not implemented"]
    let _startVotingTime = BigInt.fromI32(234)
    let _endVotingTime = BigInt.fromI32(234)
    let newVotedEvent = createVotedEvent(
      _from,
      _propositionIndex,
      _proposals,
      _startVotingTime,
      _endVotingTime
    )
    handleVoted(newVotedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Voted created and stored", () => {
    assert.entityCount("Voted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Voted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Voted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_propositionIndex",
      "234"
    )
    assert.fieldEquals(
      "Voted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_proposals",
      "[ethereum.Tuple Not implemented]"
    )
    assert.fieldEquals(
      "Voted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_startVotingTime",
      "234"
    )
    assert.fieldEquals(
      "Voted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_endVotingTime",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

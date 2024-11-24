# Proyect: Switch Control Back

This project is a very easy demonstration of how to store a piece of information in the blockchain that can be consumed by others. This project will implement a system that could control 8 switches to swith on/off up to 8 devices over the internet.

## Descripción

The goal is to store 1 byte that can control 8 switches to power on and off 8 devices. From a master-control web you could change the value of any switch and update the value in the blockchain. Then, a client web could read periodically the switches state, decode the state of every single switch and change its state accordingly to the value in the blockchain.

So, this project has these different components:
    1. Switch-Control-Back. A Rust program to implement the blockchain logic.
    2. Switch-Control. A web page to implement de master-control of the switches, calling the blockchain logic as needed.
    3. Switch-Control-Client. One o more web pages to implement the client side, that reads the state from the blockchain and reflects that state to the user.

This is a schematic that represents the idea:

![switch-control-back schematics](https://github.com/user-attachments/assets/24182ce0-7d9c-453d-a918-f28973e88532)

## Requirements

- [Rust](https://www.rust-lang.org/) (última versión estable)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://project-serum.github.io/anchor/getting-started/installation.html)

## Installation and test

    Clone this repository
        git clone <repositorio-url>
    cd switch-control-back
    anchor build
    Launch solana-test-validator
    anchor test --skip-local-validator


## Tests Results - First batch run

    switch-control-back
        ✔ Initializes (IF not exists) the switch state (519ms)
        1) Fails with an incorrect seed
        ✔ Updates the switch state (453ms)
        2) Rejects invalid PDA access


    2 passing (1s)
    2 failing

    1) switch-control-back
        Fails with an incorrect seed:
        AssertionError: Error should indicate missing or invalid account: expected 'AnchorError caused by account: switch…' to include 'Account does not exist'
        at /Users/imacpro/Desarrollo/switch-control-back/tests/switch-control-back.ts:88:14
        at Generator.throw (<anonymous>)
        at rejected (tests/switch-control-back.ts:29:65)
        at processTicksAndRejections (node:internal/process/task_queues:105:5)

    2) switch-control-back
        Rejects invalid PDA access:
        AssertionError: Error should indicate missing account: expected 'AnchorError caused by account: switch…' to include 'Account does not exist'
        at /Users/imacpro/Desarrollo/switch-control-back/tests/switch-control-back.ts:130:14
        at Generator.throw (<anonymous>)
        at rejected (tests/switch-control-back.ts:29:65)
        at processTicksAndRejections (node:internal/process/task_queues:105:5)

    error Command failed with exit code 2.

## Tests Results - Second and followings batch run (the PDA account already exists)

    switch-control-back
        1) Initializes (IF not exists) the switch state
        2) Fails with an incorrect seed
        ✔ Updates the switch state (305ms)
        3) Rejects invalid PDA access


    1 passing (414ms)
    3 failing

    1) switch-control-back
        Initializes (IF not exists) the switch state:

        Switch state should already be initialized to 0
        + expected - actual

        -55
        +0
        
        at /Users/imacpro/Desarrollo/switch-control-back/tests/switch-control-back.ts:46:14
        at Generator.next (<anonymous>)
        at fulfilled (tests/switch-control-back.ts:28:58)
        at processTicksAndRejections (node:internal/process/task_queues:105:5)

    2) switch-control-back
        Fails with an incorrect seed:
        AssertionError: Error should indicate missing or invalid account: expected 'AnchorError caused by account: switch…' to include 'Account does not exist'
        at /Users/imacpro/Desarrollo/switch-control-back/tests/switch-control-back.ts:88:14
        at Generator.throw (<anonymous>)
        at rejected (tests/switch-control-back.ts:29:65)
        at processTicksAndRejections (node:internal/process/task_queues:105:5)

    3) switch-control-back
        Rejects invalid PDA access:
        AssertionError: Error should indicate missing account: expected 'AnchorError caused by account: switch…' to include 'Account does not exist'
        at /Users/imacpro/Desarrollo/switch-control-back/tests/switch-control-back.ts:130:14
        at Generator.throw (<anonymous>)
        at rejected (tests/switch-control-back.ts:29:65)
        at processTicksAndRejections (node:internal/process/task_queues:105:5)

    error Command failed with exit code 3.

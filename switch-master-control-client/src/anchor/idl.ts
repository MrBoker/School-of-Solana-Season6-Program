export type SwitchControlBack = {
  "version": "0.1.0",
  "name": "switch_control_back",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "switchState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "update",
      "accounts": [
        {
          "name": "switchState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newState",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "switchState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "switches",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidPDA",
      "msg": "The PDA account does not match with the expected account"
    }
  ]
};

export const IDL: SwitchControlBack = {
  "version": "0.1.0",
  "name": "switch_control_back",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "switchState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "update",
      "accounts": [
        {
          "name": "switchState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newState",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "switchState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "switches",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidPDA",
      "msg": "The PDA account does not match with the expected account"
    }
  ]
};

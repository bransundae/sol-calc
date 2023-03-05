export type SolCalc = {
  "version": "0.1.0",
  "name": "sol_calc",
  "instructions": [
    {
      "name": "calculate",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": "string"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ParseError",
      "msg": "Failed to parse input"
    }
  ]
};

export const IDL: SolCalc = {
  "version": "0.1.0",
  "name": "sol_calc",
  "instructions": [
    {
      "name": "calculate",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": "string"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ParseError",
      "msg": "Failed to parse input"
    }
  ]
};

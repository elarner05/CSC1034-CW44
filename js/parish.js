import ConversationHandler from "./story-line.js"; 

const preacherDialogue = [
  {
      "id": 1,
      "text": [
          "\"Howdy, and blessings upon you\"",
          "\"What brings thee here?\""
      ],
      "choices": [
          {
              "text": "What did you think of the sheriff?",
              "nextID": 2
          },
          {
              "text": "How has the town been recently, Reverend?",
              "nextID": 3
          },
          {
              "text": "How come you're gravediggin' already?",
              "nextID": 4
          },
          {
              "text": "Seen anythin' suspicious lately?",
              "nextID": 5
          }
      ]
  }, {
      "id": 2,
      "text": [
          "\"The sheriff? A man of the law, yet also of sin. But ain't we all?\"",
          "\"His fate was written afore he was born, as is mine, as is yours.\""
      ],
      "choices": [
          {
              "text": "You talk like you knew it was comin'.",
              "nextID": 6
          },
          {
              "text": "You didn't much care for him, huh?",
              "nextID": 7
          }
      ]
  }, {
      "id": 3,
      "text": [
          "\"The Lord tests us all, and this town ain't no exception.\"",
          "\"Darkness has crept into our streets like a thief in the night.\""
      ],
      "choices": [
          {
              "text": "What kind of darkness?",
              "nextID": 8
          },
          {
              "text": "You think the town's cursed?",
              "nextID": 9
          }
      ]
  }, {
      "id": 4,
      "text": [
          "\"Death waits for no man, and neither should his grave.\"",
          "\"To the earth we return, be it in peace or in violence.\""
      ],
      "choices": [
          {
              "text": "That don't explain why you're out here now.",
              "nextID": 10
          },
          {
              "text": "Seems awful quick to me.",
              "nextID": 11
          }
      ]
  }, {
      "id": 5,
      "text": [
          "\"Suspicion is the devil's whisper, and I ain't one to heed it.\"",
          "\"But evil walks among us, make no mistake.\""
      ],
      "choices": [
          {
              "text": "Who do you think is evil?",
              "nextID": 12
          },
          {
              "text": "You see anything or not?",
              "nextID": 13
          }
      ]
  }, {
      "id": 6,
      "text": [
          "\"The Lord sees all, and sometimes he grants me visions.\"",
          "\"A storm brews long 'fore the lightning strikes.\""
      ],
      "choices": [
          {
              "text": "You have a vision about the sheriff?",
              "nextID": 14
          },
          {
              "text": "Sounds like you knew too much.",
              "nextID": 15
          }
      ]
  }, {
      "id": 7,
      "text": [
          "\"I do not judge, for only He may judge.\"",
          "\"But the sheriff was a man of many burdens, and they weighed heavy.\""
      ],
      "choices": [
          {
              "text": "What kind of burdens?",
              "nextID": 16
          },
          {
              "text": "You sound mighty cryptic, Reverend.",
              "nextID": 17
          }
      ]
  }, {
      "id": 8,
      "text": [
          "\"Sin and greed, they fester like a wound.\"",
          "\"Folk whisper in corners, making deals with the devil.\""
      ],
      "choices": [
          {
              "text": "You know somethin' you're not tellin'?",
              "nextID": 18
          },
          {
              "text": "Who do you suspect?",
              "nextID": 19
          }
      ]
  }, {
      "id": 9,
      "text": [
          "\"Cursed? Perhaps. Blessed? Perhaps.\"",
          "\"The Lord’s will is beyond our reckonin'.\""
      ],
      "choices": [
          {
              "text": "That ain't much of an answer.",
              "nextID": 20
          },
          {
              "text": "You really think it's divine will?",
              "nextID": 21
          }
      ]
  }, {
      "id": 10,
      "text": [
          "\"The dead do not wait, and neither should we.\"",
          "\"A righteous man prepares.\""
      ],
      "choices": [
          {
              "text": "You sure you weren't just expectin' a death?",
              "nextID": 22
          },
          {
              "text": "Who else you diggin' for?",
              "nextID": 23
          }
      ]
  }, {
      "id": 11,
      "text": [
          "\"When the Lord calls, one must answer.\"",
          "\"We ought not tarry with the matters of the grave.\""
      ],
      "choices": [
          {
              "text": "Sounds like you wanted him buried fast.",
              "nextID": 24
          },
          {
              "text": "You always dig graves this quick?",
              "nextID": 25
          }
      ]
  }, {
    "id": 14,
    "text": [
        "\"The Lord grants visions to those who listen.\"",
        "\"I saw fire, I saw ruin... and I saw a man fall to his fate.\""
    ],
    "choices": [
        {
            "text": "And that man was the sheriff?",
            "nextID": 32
        },
        {
            "text": "You expect me to believe that?",
            "nextID": 33
        }
    ]
}, {
    "id": 15,
    "text": [
        "\"Only He knows all. I am but His humble servant.\"",
        "\"Yet the winds whispered, and I listened.\""
    ],
    "choices": [
        {
            "text": "Whispered what?",
            "nextID": 34
        },
        {
            "text": "You're talkin' in riddles, Reverend.",
            "nextID": 35
        }
    ]
}, {
    "id": 16,
    "text": [
        "\"Burdens of the soul, of the past.\"",
        "\"A man cannot outrun his own shadow.\""
    ],
    "choices": [
        {
            "text": "What was he runnin' from?",
            "nextID": 36
        },
        {
            "text": "You ain't answerin' me straight.",
            "nextID": 37
        }
    ]
}, {
    "id": 17,
    "text": [
        "\"The truth is oft hidden behind words.\"",
        "\"But He sees all, and He judges.\""
    ],
    "choices": [
        {
            "text": "And what does He see in you?",
            "nextID": 38
        },
        {
            "text": "You sure do like speakin' for Him.",
            "nextID": 39
        }
    ]
}, {
    "id": 18,
    "text": [
        "\"I know only what is revealed to me.\"",
        "\"The Lord sees the wicked and the righteous alike.\""
    ],
    "choices": [
        {
            "text": "So who’s wicked?",
            "nextID": 40
        },
        {
            "text": "That's a mighty convenient answer.",
            "nextID": 41
        }
    ]
}, {
    "id": 19,
    "text": [
        "\"Suspicion is a dangerous thing.\"",
        "\"But there are men who deal in shadows and lies.\""
    ],
    "choices": [
        {
            "text": "Got a name for me?",
            "nextID": 42
        },
        {
            "text": "You're dancin' around my question.",
            "nextID": 43
        }
    ]
}, {
    "id": 20,
    "text": [
        "\"Some answers ain't ours to know.\"",
        "\"Some things are better left in His hands.\""
    ],
    "choices": [
        {
            "text": "You sure do dodge questions, Reverend.",
            "nextID": 44
        },
        {
            "text": "Sounds like you just don't wanna say.",
            "nextID": 45
        }
    ]
}, {
    "id": 21,
    "text": [
        "\"The Lord works in ways we cannot grasp.\"",
        "\"What befalls this town is His will, no more, no less.\""
    ],
    "choices": [
        {
            "text": "You accept that too easy.",
            "nextID": 46
        },
        {
            "text": "So the Lord wanted the sheriff dead?",
            "nextID": 47
        }
    ]
}, {
    "id": 22,
    "text": [
        "\"I expect death, as all men should.\"",
        "\"It is not a question of if, only when.\""
    ],
    "choices": [
        {
            "text": "That don't mean you were expectin' his.",
            "nextID": 48
        },
        {
            "text": "You talk like you knew it was comin'.",
            "nextID": 49
        }
    ]
}, {
    "id": 23,
    "text": [
        "\"All men have their time.\"",
        "\"Some sooner than others.\""
    ],
    "choices": [
        {
            "text": "Who else you think is next?",
            "nextID": 50
        },
        {
            "text": "That's a mighty grim way to put it.",
            "nextID": 51
        }
    ]
}, {
      "id": 24,
      "text": [
          "\"All men must return to dust, sooner or later.\"",
          "\"Why delay the inevitable?\""
      ],
      "choices": [
          {
              "text": "Maybe because it ain't natural.",
              "nextID": 1
          }
      ]
  }, {
    "id": 32,
    "text": [
        "\"Aye, I saw his fall before it came to pass.\"",
        "\"Yet I knew not the hand that struck him down.\""
    ],
    "choices": [
        {
            "text": "Convenient, ain't it?",
            "nextID": 51
        }
    ]
}, {
    "id": 33,
    "text": [
        "\"Faith ain't about belief in man, but belief in Him.\"",
        "\"Doubt if you must, but the truth remains.\""
    ],
    "choices": [
        {
            "text": "I'll be the judge of truth.",
            "nextID": 51
        }
    ]
}, {
    "id": 34,
    "text": [
        "\"The winds carried words of betrayal, of judgment.\"",
        "\"But whose? That was hidden from me.\""
    ],
    "choices": [
        {
            "text": "Sounds like an excuse.",
            "nextID": 51
        }
    ]
}, {
    "id": 35,
    "text": [
        "\"Riddles hold truth, if one listens.\"",
        "\"But I see your ears are shut.\""
    ],
    "choices": [
        {
            "text": "Then I reckon we're done talkin'.",
            "nextID": 51
        }
    ]
}, {
    "id": 36,
    "text": [
        "\"From himself. From the choices he made.\"",
        "\"But a man cannot outrun his own sins.\""
    ],
    "choices": [
        {
            "text": "You ain't sayin' much, Reverend.",
            "nextID": 51
        }
    ]
}, {
    "id": 37,
    "text": [
        "\"Some truths are best left buried.\"",
        "\"Dig too deep, and you may not like what you find.\""
    ],
    "choices": [
        {
            "text": "I ain't afraid of the truth.",
            "nextID": 51
        }
    ]
}, {
    "id": 38,
    "text": [
        "\"A sinner, seeking redemption.\"",
        "\"A man just like you.\""
    ],
    "choices": [
        {
            "text": "I ain't nothin' like you.",
            "nextID": 51
        }
    ]
}, {
    "id": 39,
    "text": [
        "\"Someone must.\"",
        "\"Else who will listen?\""
    ],
    "choices": [
        {
            "text": "I think I’ve heard enough.",
            "nextID": 51
        }
    ]
}, {
    "id": 40,
    "text": [
        "\"Evil ain't always one man.\"",
        "\"Sometimes it's a sickness, spreadin’ quiet-like.\""
    ],
    "choices": [
        {
            "text": "That don't answer my question.",
            "nextID": 51
        }
    ]
}, {
    "id": 41,
    "text": [
        "\"Convenience ain't got nothin' to do with it.\"",
        "\"It is simply the way of things.\""
    ],
    "choices": [
        {
            "text": "Then I reckon this talk is over.",
            "nextID": 51
        }
    ]
}, {
    "id": 42,
    "text": [
        "\"Names are heavy things.\"",
        "\"One best be careful before speakin' 'em.\""
    ],
    "choices": [
        {
            "text": "Then you ain't got nothin' useful for me.",
            "nextID": 51
        }
    ]
}, {
    "id": 43,
    "text": [
        "\"A man must be careful where he treads.\"",
        "\"Lest he step where he shouldn't.\""
    ],
    "choices": [
        {
            "text": "I'll walk where I please.",
            "nextID": 51
        }
    ]
}, {
    "id": 44,
    "text": [
        "\"A preacher ain't in the business of certainty.\"",
        "\"Only faith.\""
    ],
    "choices": [
        {
            "text": "Faith ain't proof.",
            "nextID": 51
        }
    ]
}, {
    "id": 45,
    "text": [
        "\"Some things ain't meant for mortal minds.\"",
        "\"Only for Him.\""
    ],
    "choices": [
        {
            "text": "That ain't good enough for me.",
            "nextID": 51
        }
    ]
}, {
    "id": 46,
    "text": [
        "\"Acceptance brings peace.\"",
        "\"Fighting fate brings only sorrow.\""
    ],
    "choices": [
        {
            "text": "I ain't buyin' that.",
            "nextID": 51
        }
    ]
}, {
    "id": 47,
    "text": [
        "\"He allows all things, good and bad alike.\"",
        "\"The meaning is not always for us to know.\""
    ],
    "choices": [
        {
            "text": "That don't sit right with me.",
            "nextID": 51
        }
    ]
}, {
    "id": 48,
    "text": [
        "\"No man is spared.\"",
        "\"Not even those with a badge.\""
    ],
    "choices": [
        {
            "text": "This ain't helpin' much.",
            "nextID": 51
        }
    ]
}, {
    "id": 49,
    "text": [
        "\"We all see the storm clouds.\"",
        "\"Some just know what they mean.\""
    ],
    "choices": [
        {
            "text": "And you did?",
            "nextID": 51
        }
    ]
}, {
    "id": 50,
    "text": [
        "\"Who among us knows the hour of his end?\"",
        "\"Perhaps none. Perhaps all.\""
    ],
    "choices": [
        {
            "text": "That ain't an answer.",
            "nextID": 51
        }
    ]
}, {
    "id": 51,
    "text": [
        "\"May the Lord guide your path, for it is a treacherous one.\"",
        "\"And may you not stumble where others have fallen.\""
    ],
    "choices": []
}
];




const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");
const containerElement = document.getElementById("choicesContainer");

const conversation = new ConversationHandler(preacherDialogue, textElement, nextButton, containerElement, 20);

conversation.start();

conversation.getPromise().then(() => {
  nextButton.innerHTML = "Close";
  nextButton.classList.remove("hidden");
  nextButton.addEventListener("click", () => {
    document.getElementById("textBox").classList.add("hidden");
  })
})
import ConversationHandler from "./story-line.js";
import * as Timer from "./timer.js";

Timer.injectClock();

// Start the interval to update the clock
setInterval(Timer.updateClockDisplay, 1000);

// On page load, set the clock immediately
document.addEventListener("DOMContentLoaded", Timer.updateClockDisplay);


const preacherDialogue = [
  {
      "id": 1,
      "text": [
          "You walk up to the town parish.", 
          "You see Willie McCrea, the town preacher, overseeing the gravediggers."
      ],
      "choices": [
          {
              "text": "Talk to Rev. McCrea",
              "nextID": 2
          },
          {
              "text": "Look for clues",
              "nextID": 100
          }
      ]
  }, {
      "id": 2,
      "text": [
          "\"Howdy, and blessings upon you\"",
          "\"What brings thee here?\""
      ],
      "choices": [
          {
              "text": "What did you think of the sheriff?",
              "nextID": 3
          },
          {
              "text": "How has the town been recently, Reverend?",
              "nextID": 4
          },
          {
              "text": "How come you're gravediggin' already?",
              "nextID": 5
          },
          {
              "text": "Seen anythin' suspicious lately?",
              "nextID": 6
          }
      ]
  }, {
      "id": 3,
      "text": [
          "\"The sheriff? A man of the law, yet also of sin. But ain't we all?\"",
          "\"His fate was written afore he was born, as is mine, as is yours.\""
      ],
      "choices": [
          {
              "text": "You talk like you knew it was comin'.",
              "nextID": 7
          },
          {
              "text": "You didn't much care for him, huh?",
              "nextID": 8
          }
      ]
  }, {
      "id": 4,
      "text": [
          "\"The Lord tests us all, and this town ain't no exception.\"",
          "\"Darkness has crept into our streets like a thief in the night.\""
      ],
      "choices": [
          {
              "text": "What kind of darkness?",
              "nextID": 9
          },
          {
              "text": "You think the town's cursed?",
              "nextID": 10
          }
      ]
  }, {
      "id": 5,
      "text": [
          "\"Death waits for no man, and neither should his grave.\"",
          "\"To the earth we return, be it in peace or in violence.\""
      ],
      "choices": [
          {
              "text": "That don't explain why you're out here now.",
              "nextID": 11
          },
          {
              "text": "Seems awful quick to me.",
              "nextID": 12
          }
      ]
  }, {
      "id": 6,
      "text": [
          "\"Suspicion is the devil's whisper, and I ain't one to heed it.\"",
          "\"But evil walks among us, make no mistake.\""
      ],
      "choices": [
          {
              "text": "Who do you think is evil?",
              "nextID": 13
          },
          {
              "text": "You see anything or not?",
              "nextID": 14
          }
      ]
  }, {
      "id": 7,
      "text": [
          "\"The Lord sees all, and sometimes he grants me visions.\"",
          "\"A storm brews long 'fore the lightning strikes.\""
      ],
      "choices": [
          {
              "text": "You have a vision about the sheriff?",
              "nextID": 15
          },
          {
              "text": "Sounds like you knew too much.",
              "nextID": 16
          }
      ]
  }, {
      "id": 8,
      "text": [
          "\"I do not judge, for only He may judge.\"",
          "\"But the sheriff was a man of many burdens, and they weighed heavy.\""
      ],
      "choices": [
          {
              "text": "What kind of burdens?",
              "nextID": 17
          },
          {
              "text": "You sound mighty cryptic, Reverend.",
              "nextID": 18
          }
      ]
  }, {
      "id": 9,
      "text": [
          "\"Sin and greed, they fester like a wound.\"",
          "\"Folk whisper in corners, making deals with the devil.\""
      ],
      "choices": [
          {
              "text": "You know somethin' you're not tellin'?",
              "nextID": 19
          },
          {
              "text": "Who do you suspect?",
              "nextID": 20
          }
      ]
  }, {
      "id": 10,
      "text": [
          "\"Cursed? Perhaps. Blessed? Perhaps.\"",
          "\"The Lord’s will is beyond our reckonin'.\""
      ],
      "choices": [
          {
              "text": "That ain't much of an answer.",
              "nextID": 21
          },
          {
              "text": "You really think it's divine will?",
              "nextID": 22
          }
      ]
  }, {
      "id": 11,
      "text": [
          "\"The dead do not wait, and neither should we.\"",
          "\"A righteous man prepares.\""
      ],
      "choices": [
          {
              "text": "You sure you weren't just expectin' a death?",
              "nextID": 23
          },
          {
              "text": "Who else you diggin' for?",
              "nextID": 24
          }
      ]
  }, {
      "id": 12,
      "text": [
          "\"When the Lord calls, one must answer.\"",
          "\"We ought not tarry with the matters of the grave.\""
      ],
      "choices": [
          {
              "text": "Sounds like you wanted him buried fast.",
              "nextID": 25
          },
          {
              "text": "You always dig graves this quick?",
              "nextID": 26
          }
      ]
  }, {
    "id": 13,
    "text": [
        "\"Evil ain't always the man with blood on his hands.\"",
        "\"Sometimes, it's the one who whispers in the dark.\""
    ],
    "choices": [
        {
            "text": "You got a name in mind?",
            "nextID": 27
        },
        {
            "text": "Sounds like you're dodgin' the question.",
            "nextID": 28
        }
    ]
}, {
    "id": 14,
    "text": [
        "\"I see what the Lord allows me to see.\"",
        "\"And He ain't shown me nothin' but sorrow.\""
    ],
    "choices": [
        {
            "text": "That ain't much help.",
            "nextID": 29
        },
        {
            "text": "You sure you're tellin' the truth?",
            "nextID": 30
        }
    ]
}, {
    "id": 15,
    "text": [
        "\"The Lord grants visions to those who listen.\"",
        "\"I saw fire, I saw ruin... and I saw a man fall to his fate.\""
    ],
    "choices": [
        {
            "text": "And that man was the sheriff?",
            "nextID": 33
        },
        {
            "text": "You expect me to believe that?",
            "nextID": 34
        }
    ]
}, {
    "id": 16,
    "text": [
        "\"Only He knows all. I am but His humble servant.\"",
        "\"Yet the winds whispered, and I listened.\""
    ],
    "choices": [
        {
            "text": "Whispered what?",
            "nextID": 35
        },
        {
            "text": "You're talkin' in riddles, Reverend.",
            "nextID": 36
        }
    ]
}, {
    "id": 17,
    "text": [
        "\"Burdens of the soul, of the past.\"",
        "\"A man cannot outrun his own shadow.\""
    ],
    "choices": [
        {
            "text": "What was he runnin' from?",
            "nextID": 37
        },
        {
            "text": "You ain't answerin' me straight.",
            "nextID": 38
        }
    ]
}, {
    "id": 18,
    "text": [
        "\"The truth is oft hidden behind words.\"",
        "\"But He sees all, and He judges.\""
    ],
    "choices": [
        {
            "text": "And what does He see in you?",
            "nextID": 39
        },
        {
            "text": "You sure do like speakin' for Him.",
            "nextID": 40
        }
    ]
}, {
    "id": 19,
    "text": [
        "\"I know only what is revealed to me.\"",
        "\"The Lord sees the wicked and the righteous alike.\""
    ],
    "choices": [
        {
            "text": "So who’s wicked?",
            "nextID": 41
        },
        {
            "text": "That's a mighty convenient answer.",
            "nextID": 42
        }
    ]
}, {
    "id": 20,
    "text": [
        "\"Suspicion is a dangerous thing.\"",
        "\"But there are men who deal in shadows and lies.\""
    ],
    "choices": [
        {
            "text": "Got a name for me?",
            "nextID": 43
        },
        {
            "text": "You're dancin' around my question.",
            "nextID": 44
        }
    ]
}, {
    "id": 21,
    "text": [
        "\"Some answers ain't ours to know.\"",
        "\"Some things are better left in His hands.\""
    ],
    "choices": [
        {
            "text": "You sure do dodge questions, Reverend.",
            "nextID": 45
        },
        {
            "text": "Sounds like you just don't wanna say.",
            "nextID": 46
        }
    ]
}, {
    "id": 22,
    "text": [
        "\"The Lord works in ways we cannot grasp.\"",
        "\"What befalls this town is His will, no more, no less.\""
    ],
    "choices": [
        {
            "text": "You accept that too easy.",
            "nextID": 47
        },
        {
            "text": "So the Lord wanted the sheriff dead?",
            "nextID": 48
        }
    ]
}, {
    "id": 23,
    "text": [
        "\"I expect death, as all men should.\"",
        "\"It is not a question of if, only when.\""
    ],
    "choices": [
        {
            "text": "That don't mean you were expectin' his.",
            "nextID": 49
        },
        {
            "text": "You talk like you knew it was comin'.",
            "nextID": 24
        }
    ]
}, {
    "id": 24,
    "text": [
        "\"All men have their time.\"",
        "\"Some sooner than others.\""
    ],
    "choices": [
        {
            "text": "Who else you think is next?",
            "nextID": 51
        },
        {
            "text": "That's a mighty grim way to put it.",
            "nextID": 52
        }
    ]
}, {
      "id": 25,
      "text": [
          "\"All men must return to dust, sooner or later.\"",
          "\"Why delay the inevitable?\""
      ],
      "choices": [
          {
              "text": "Maybe because it ain't natural.",
              "nextID": 49
          }
      ]
  }, {
  "id": 26,
  "text": [
      "\"Death waits for no man.\"",
      "\"Some folk just understand that better'n others.\""
  ],
  "choices": [
      {
          "text": "That still don't sit right with me.",
          "nextID": 25
      }
  ]
}, {
  "id": 27,
  "text": [
      "\"Names got power, and power ain't to be given lightly.\"",
      "\"But there are those who whisper when they ought to pray.\""
  ],
  "choices": [
      {
          "text": "You best start talkin' straight, Reverend.",
          "nextID": 52
      }
  ]
}, {
  "id": 28,
  "text": [
      "\"I speak only what I know.\"",
      "\"And what I know ain't always clear.\""
  ],
  "choices": []
}, {
  "id": 29,
  "text": [
      "\"Help comes in many forms.\"",
      "\"Perhaps you ain't lookin' in the right place.\""
  ],
  "choices": [
      {
          "text": "And where should I be lookin'?",
          "nextID": 35
      }
  ]
}, {
  "id": 30,
  "text": [
      "\"The truth is a heavy burden.\"",
      "\"One not all men are strong enough to carry.\""
  ],
  "choices": [
      {
          "text": "I can handle it.",
          "nextID": 38
      }
  ]
}, {
  "id": 31,
  "text": [
      "\"Some roads ain't meant to be walked alone.\"",
      "\"Yet we all must walk 'em just the same.\""
  ],
  "choices": [
      {
          "text": "You ain't makin' much sense.",
          "nextID": 36
      }
  ]
}, {
  "id": 32,
  "text": [
      "\"We all got reckonin' comin' one way or another.\"",
      "\"Best to be ready when it does.\""
  ],
  "choices": [
      {
          "text": "You talk like you expect yours soon.",
          "nextID": 45
      }
  ]
}, {
    "id": 33,
    "text": [
        "\"Aye, I saw his fall before it came to pass.\"",
        "\"Yet I knew not the hand that struck him down.\""
    ],
    "choices": [
        {
            "text": "Convenient, ain't it?",
            "nextID": 28
        }
    ]
}, {
    "id": 34,
    "text": [
        "\"Faith ain't about belief in man, but belief in Him.\"",
        "\"Doubt if you must, but the truth remains.\""
    ],
    "choices": []
}, {
    "id": 35,
    "text": [
        "\"The winds carried words of betrayal, of judgment.\"",
        "\"But whose? That was hidden from me.\""
    ],
    "choices": [
        {
            "text": "Sounds like an excuse.",
            "nextID": 28
        }
    ]
}, {
    "id": 36,
    "text": [
        "\"Riddles hold truth, if one listens.\"",
        "\"But I see your ears are shut.\""
    ],
    "choices": []
}, {
    "id": 37,
    "text": [
        "\"From himself. From the choices he made.\"",
        "\"But a man cannot outrun his own sins.\""
    ],
    "choices": []
}, {
    "id": 38,
    "text": [
        "\"Some truths are best left buried.\"",
        "\"Dig too deep, and you may not like what you find.\""
    ],
    "choices": []
}, {
    "id": 39,
    "text": [
        "\"A sinner, seeking redemption.\"",
        "\"A man just like you.\""
    ],
    "choices": []
}, {
    "id": 40,
    "text": [
        "\"Someone must.\"",
        "\"Else who will listen?\""
    ],
    "choices": []
}, {
    "id": 41,
    "text": [
        "\"Evil ain't always one man.\"",
        "\"Sometimes it's a sickness, spreadin’ quiet-like.\""
    ],
    "choices": []
}, {
    "id": 42,
    "text": [
        "\"Convenience ain't got nothin' to do with it.\"",
        "\"It is simply the way of things.\""
    ],
    "choices": []
}, {
    "id": 43,
    "text": [
        "\"Names are heavy things.\"",
        "\"One best be careful before speakin' 'em.\""
    ],
    "choices": []
}, {
    "id": 44,
    "text": [
        "\"A man must be careful where he treads.\"",
        "\"Lest he step where he shouldn't.\""
    ],
    "choices": []
}, {
    "id": 45,
    "text": [
        "\"A preacher ain't in the business of certainty.\"",
        "\"Only faith.\""
    ],
    "choices": []
}, {
    "id": 46,
    "text": [
        "\"Some things ain't meant for mortal minds.\"",
        "\"Only for Him.\""
    ],
    "choices": []
}, {
    "id": 47,
    "text": [
        "\"Acceptance brings peace.\"",
        "\"Fighting fate brings only sorrow.\""
    ],
    "choices": []
}, {
    "id": 48,
    "text": [
        "\"He allows all things, good and bad alike.\"",
        "\"The meaning is not always for us to know.\""
    ],
    "choices": []
}, {
    "id": 49,
    "text": [
        "\"No man is spared.\"",
        "\"Not even those with a badge.\""
    ],
    "choices": [
        {
            "text": "This ain't helpin' much.",
            "nextID": 50
        }
    ]
}, {
    "id": 50,
    "text": [
        "\"We all see the storm clouds.\"",
        "\"Some just know what they mean.\""
    ],
    "choices": []
}, {
    "id": 51,
    "text": [
        "\"Who among us knows the hour of his end?\"",
        "\"Perhaps none. Perhaps all.\""
    ],
    "choices": []
}, {
    "id": 52,
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

const conversation = new ConversationHandler(preacherDialogue, textElement, nextButton, containerElement, 21);

conversation.start();

conversation.getPromise().then(() => {
  nextButton.innerHTML = "Close";
  nextButton.classList.remove("hidden");
  nextButton.addEventListener("click", () => {
    document.getElementById("textBox").classList.add("hidden");
  })
})
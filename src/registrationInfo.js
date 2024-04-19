export const registrationInfo = {
  introDescription: `The proceeds from this event will be donated directly to the ALS Association supporting Matt Henderson in the 2024 CEO Soak.

    This event is designed to bring people together, create some fun competition, and support an important cause. All skill levels are welcome. Depending on the number of registrations we may create 2 brackets based on skill level.
    `,
  registrationOptions: [
    {
      optionName: "Team Registration",
      optionDescriptionItems: {
        cost: 50,
        includes: ["Airmail Challenge", "Team Double Elimination Tournament"],
      },
    },
    {
      optionName: "Individual Registration",
      optionDescriptionItems: {
        cost: 25,
        includes: [
          "Airmail Challenge",
          "Partner Pool - Get paired with a partner for the Team Double Elimination Tournament",
        ],
      },
    },
  ],
  PaymentOptions: [
    {
      optionName: "Pay online - Reserve your spot",
      optionDescription:
        "Prepay with credit or debit card to reserve your spot. You will receive a confirmation email upon registration. ",
    },
    {
      optionName: "Pay at the Event - First come first serve",
      optionDescription:
        "Pay in cash at the event. Registration is first come first serve. A maximum of 20 teams can register. You can complete the registration form to let us know you're coming. We’ll send you an email reminder before the event and let you know if the event is filling up. ",
    },
  ],
};

export const includedItems = [
  {
    optionName: "Double Elimination Team Tournament",
    descipriton: [
      "First team to score 21 or more points wins.",
      "Each team plays a minimum of 2 games.",
      "1st place wins 20% of the pot (minimum $100), 2nd place wins 10% of the pot (minimum $50)",
      "Each team must register all players before the start of the event. Players cannot switch teams after the event has started.",
      "Maximum of 3 players per team.",
      "Standard cornhole bags are provided or you can bring your own ACL certified bags.",
    ],
  },
  {
    optionName: "One Shot Challenge",
    descipriton: [
      "Each player gets a raffle ticket & 1 throw to make a cornhole.",
      "Any player who does not get the bag in the hole is out.",
      "We’ll repeat until only 1 person gets a cornhole - winner",
      "If no one gets a cornhole during a round then we’ll pick a raffle ticket.",
      "The winner of the raffle gets 2 throws to get a cornhole. - winner",
      "Winning prize is $50",
    ],
  },
];

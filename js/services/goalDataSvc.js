app.service('goalDataSvc', function() {
    this.userGoalList = [
        {
            title: 'Goal 1',
            description: 'This is a description for Goal 1',
            targets: [
                {
                    value: '',
                    unit: ''
                }
            ],
            beginDate: 'MM/DD/YYYY',
            deadline: 'MM/DD/YYYY',
            completed: false,
            subGoalList: [
                {
                    title: 'Goal 1, Sub Goal 1',
                    description: 'This is a descriptionn for sub goal 1',
                    targets: [
                        {
                            value: '',
                            unit: ''
                        }
                    ],
                    deadline: 'MM/DD/YYYY',
                    completed: false
                },
                {
                    title: 'Goal 1, Sub Goal 2',
                    description: 'This is a description for sub goal 2',
                    targets: [
                        {
                            value: '',
                            unit: ''
                        }
                    ],
                    deadline: 'MM/DD/YYYY',
                    completed: false
                }
            ]
        },
        {
            title: 'Goal 2',
            description: 'This is a description for Goal 2',
            targets: [
                {
                    value: '',
                    unit: ''
                }
            ],
            beginDate: 'MM/DD/YYYY',
            deadline: 'MM/DD/YYYY',
            completed: false,
            subGoalList: [
                {
                    title: 'Goal 2, Sub Goal 1',
                    description: 'This is a description for sub goal 1',
                    targets: [
                        {
                            value: '',
                            unit: ''
                        }
                    ],
                    deadline: 'MM/DD/YYYY',
                    completed: false
                },
                {
                    title: 'Goal 2, Sub Goal 2',
                    description: 'This is a description for sub goal 2',
                    targets: [
                        {
                            value: '',
                            unit: ''
                        }
                    ],
                    deadline: 'MM/DD/YYYY',
                    completed: false
                }
            ]
        }
    ];

});
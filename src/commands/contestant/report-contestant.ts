import { Message } from 'discord.js';

import { Router } from '../../router';
import { ContestantService, ImageService } from '../../client';

export class ReportContestantRosterCommand {

    constructor(private contestantService: ContestantService, private imageService: ImageService) {

    }

    register(router: Router) {
        router.addRoute(['contestant', ':contestantName'], (message, params) => this.printContestant(message, params.contestantName));
    }

    private printContestant(message: Message, contestantName: string) {
        return this.contestantService.getContestant(contestantName).then((contestant) => {
            return this.imageService.getImage(contestant.profileImageName).then(image => {
                message.reply({
                    embed: {
                        title: contestant.name,
                        color: 16733986,
                        thumbnail: {
                            url: image.url,
                            height: 80,
                            width: 80
                        },
                        fields: [
                            { name: 'Class', value: contestant.fehClass },
                            { name: 'Gender', value: contestant.gender },
                            { name: 'Hometown', value: contestant.background.hometown },
                            { name: 'Occupation', value: contestant.background.occupation },
                            { name: 'Boon', value: contestant.boon },
                            { name: 'Bane', value: contestant.bane }
                        ],
                        footer: {
                            text: 'Image credit: ' + image.author
                        }
                    }
                });
            });
        });
    }

}
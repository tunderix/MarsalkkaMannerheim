import {
    Discord,
    CommandMessage,
    Command,
    Description,
    On,
    ArgsOf,
    Guard,
} from "@typeit/discord";
import { Message } from "discord.js";

interface RankingUser {
    name: string;
    ranking: number;
}

let rankings: RankingUser[] = [];

@Discord("!")
@Description("Example of having everything in one file!")
export abstract class MessageCounter {
    @On("message")
    recievedMessage([message]: ArgsOf<"message">): void {
        // create user object if not existing
        const person = rankings.find( ({ name }) => name === message.author.username );
        
        if(person === null || person === undefined){
            const newUser: RankingUser = {
                name: message.author.username,
                ranking: 0,
            }
            rankings.push(newUser);
        }
        
        if(person){
            // Increment Ranking
            this.addUserRanking(person.name);    
        }
    }
    
    addUserRanking(personName: string){
        const objIndex = rankings.findIndex((rankingUser => rankingUser.name === personName ));
        rankings[objIndex].ranking += 1;
    }

    @Command("ränkings")
    rankings(command: CommandMessage): void {
        const person = rankings.find( ({ name }) => name === command.author.username );
        if(person){
            command.reply(person.name +  " on " + person.ranking + "pistettä");
        }
    }

}
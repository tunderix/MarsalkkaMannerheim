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

let rankings = [{
    name: "ioni", 
    ranking: 0
}];


  @Discord("!")
@Description("Example of having everything in one file!")
export abstract class MessageCounter {
    @On("message")
    recievedMessage([message]: ArgsOf<"message">): void {
      console.log("RÄNK", message.author);
      rankings[message.author.username] += 1;
    
      rankings.["" + message.author.username] += 1
    }


    @Command("ränkings")
    rankings(command: CommandMessage): void {
    command.reply(command.author.username +  " on " + rankings[command.author.username] + "pistettä")
      
      
    }
}
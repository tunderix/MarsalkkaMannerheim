import {
  Discord,
  CommandMessage,
  Command,
  Description,
  On,
  ArgsOf,
  Guard,
} from "@typeit/discord";
import { NotBot } from './NotABot';

let speakers = [];
const apple = {
  maku: "hyvä",
  hinta: {
    arvo: 9.95
  },
};

@Discord("!")
@Description("Example of having everything in one file!")
export abstract class AllInOne {

  @Command("ping")
  @Guard(NotBot)
  ping(command: CommandMessage): void {
    let allreadyinspeakers = false;

    // loopthrowspeakers
    for (let index = 0; index < speakers.length; index += 1) {
      const author = speakers[index];
      if (author === command.author.username) {
        allreadyinspeakers = true;
      }
    }

    // save author of message
    if (!allreadyinspeakers) {
      speakers.push(command.author.username);
    }

    // construct message
    let message = "";
    for (let index = 0; index < speakers.length; index += 1) {
      const author = speakers[index]; 
      message = message + author + ", ";
    }

    // send costructed message
    command.reply(message);
  }


  @Command("hellothere")
  hello(command: CommandMessage): void {
    const taulukko = [1,2,3];
    let message = "terekukkuu";
    message = message + "!";
    command.author.send("General Kenobi!");
    for (let index = 0; index < taulukko.length; index += 1) {
      message += taulukko[index];
      command.reply(message);
    }
    
  }

  @On("ready")
  initialize(): void {
    console.log("Bot logged in.");
  }

  @On("message")
  recievedMessage([message]: ArgsOf<"message">): void {
    console.log("Got message", message.content);
  }

  @On("messageDelete")
  messageDeleted([message]: ArgsOf<"messageDelete">): void {
    console.log(`${message.id}:${message.content} was deleted.`);
  }

  @On("guildMemberAdd")
  memberJoin([member]: ArgsOf<"guildMemberAdd">): void {
    console.log(`User : ${member.user.username} has joined the Discord Server.`);
  }

  @On("guildCreate")
  guildJoin([guild]: ArgsOf<"guildCreate">): void {
    console.log(`Bot added to the Discord Server : ${guild.name}`);
  }

}

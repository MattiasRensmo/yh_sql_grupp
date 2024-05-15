## Arbetsgång

Börja med "skapa"-grejerna så går det enklare när man ska göra allt annat sen. Tar man en grej så är man ansvarig från endpoint hela vägen till databasen.

## Tabeller med exempeldata

users
| userId | username | password |
| ----------- | --------- | --------------- |
| 1 | rebberiet | 123abc |
| 2 | mattias | losen |
| 3 | mo | hej |

channels
| channelId | owner | channelName |
| ----------- | --------- | --------------- |
| 1 | 2 | mattias kanal |
| 2 | 1 | reidar fan club |
| 3 | 1 | en annan grupp |

messages
| messageId | userId | text | date |
| ----------- | --------- | --------------- | -------- |
| 1 | 2 | mattias text | 20240101 |
| 2 | 2 | mattias andra text | 20240101 |

subscribers
| channelId | userId |
| ----------- | --------- |
| 1 | 2 |
| 1 | 3 |
| 2 | null |
| 3 | 2 |

channelMessages
| channelId | messageId |
| ----------- | --------- |
| 1 | 1 |
| 1 | 2 |
| 2 | 1 |
| 3 | 2 |

## API Endpoints

### User

#### skapa användare \*

- JENS, REBBAN
  POST /api/user/signup

#### logga in användare

POST /api/user/login

#### ändra användare

PUT /api/user/:userId

#### radera användare

DELETE /api/user/:userId

#### hämta alla användare

GET /api/user/

#### hämta en användare _(inkl vilka kanaler hen prenumererar på och vilka hen äger)_ \*

GET /api/user/:userId

#### börja prenumerera på kanal (/api/user/sub/1) \*

POST /api/user/:userId/sub/:channelId

#### sluta prenumerera på kanal

DELETE /api/user/:userId/sub/:channelId

### Channel

#### skapa kanal \*

POST /api/channel/

#### ändra kanal

PUT /api/channel/

#### radera kanal

DELETE /api/channel/

#### hämta alla kanaler

GET /api/channel/

#### hämta en kanal (inkl. meddelanden, owner, subscribers) \*

GET /api/channel/:id/
GET /api/channel/:id/sortByDate/[asc/desc]

### Message

#### posta ett meddelande till en eller flera kanaler \*

POST /api/message/
BODY:
{
text: string,
userId: number,
}

#### hämta ett meddelande (inkl författare o kanaler den ligger på)

GET /api/message/:id

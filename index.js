const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  #Stream
  type Stream {
    name: String,
    timestamp: Int,
    participant: [Streamer],
    streamType: [StreamType],
    tags: [Tag],
    game: [Game]
  }

  type Streamer {
    name: String,
    inPreset: [Preset],
  }

  type StreamType {
    name: String
  }

  type Tag {
    name: String
  }

  type Game {
    name: String
  }

  type Preset {
    name: String,
    streamers: [Streamer],
  }

  type Query {
    streams: [Stream],
    streamers: [Streamer],
    streamTypes: [StreamType],
    games: [Game],
    presets: [Preset]
  }
`;

const streamTypes = [
  {
    name: 'The Awakening'
  },
  {
    name: 'City of Glass'
  },
  {
    name: 'hololive'
  }
];

const tags = [
  {
    name: 'tag0'
  },
  {
    name: 'tag1'
  },
  {
    name: 'tag2'
  },
  {
    name: 'tag3'
  },
];

const games = [
  {
    name: 'game0'
  },
  {
    name: 'game1'
  },
  {
    name: 'game2'
  },
  {
    name: 'game3'
  },
];

const streamers = [
  {
    name: 'Kiara',
    inPreset: [],
  },
  {
    name: 'Cali',
    inPreset: [],
  },
  {
    name: 'Gura',
    inPreset: [],
  },
  {
    name: 'Ina',
    inPreset: [],
  },
  {
    name: 'Ami',
    inPreset: [],
  },
];

const presets = [
  {
    name: 'holoen',
    streamers: streamers,
  },
];

const streams = [
  {
    name: 'Stream0',
    timestamp: 1608063082,
    participant: [streamers[0]],
    streamType: [streamTypes[1]],
    tags: [tags[0]],
    game: []
  },
  {
    name: 'Stream1',
    timestamp: 1608063082,
    participant: [streamers[1]],
    streamType: [streamTypes[0]],
    tags: [tags[0],tags[1]],
    game: []
  },
  {
    name: 'Stream3',
    timestamp: 1608063082,
    participant: [streamers[3]],
    streamType: [streamTypes[0]],
    tags: [tags[0],tags[1]],
    game: [games[0]]
  },
];




// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    streams: () => streams,
    streamers: () => streamers,
    streamTypes: () => streamTypes,
    games: () => games,
    presets: () => presets,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

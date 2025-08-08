// Mock database for demo purposes
let songs: any[] = [];
let nextId = 1;

export class Song {
  static async create(data: any) {
    const song = {
      id: nextId++,
      created_date: new Date().toISOString(),
      ...data
    };
    songs.push(song);
    return song;
  }

  static async get(id: number) {
    return songs.find(song => song.id === id);
  }

  static async list(orderBy?: string) {
    let sortedSongs = [...songs];
    if (orderBy === "-created_date") {
      sortedSongs.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
    }
    return sortedSongs;
  }
}

class Playlist {
    constructor(name) {
        this.playlistName = name;
        this.songs = [];
    }

    addSong(songName) {
        this.songs.push(songName);
    }

    createMatchFunction(songName) {
        const findIndexFunction = function (element, index, array) {
            return element.toLowerCase() === songName.toLowerCase();
        }
        return findIndexFunction;
    }

    removeSong(songName) {
        const matchFunction = this.createMatchFunction(songName);
        const index = this.songs.findIndex(matchFunction);
        this.songs.shift(index, 1);
    }

    findIndex(songName) {
        for (let i = 0; i < this.songs.length; i++) {
            if (this.songs[i].toLowerCase() === songName.toLowerCase()) {
                return i;
            }
        }

    }
}

const playlist = new Playlist('More Life');
playlist.addSong('Passionfruit');
playlist.addSong('Fake Love');
playlist.addSong('El condor herido');
console.log(playlist);
playlist.removeSong('passionfruit');
console.log(playlist);




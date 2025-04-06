
import { EmbedData } from "../components/embeds/EmbedCard";

export const sampleEmbeds: EmbedData[] = [
  {
    id: "1",
    type: "youtube",
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    title: "Tomorrowland 2023 Highlights",
    description: "The best moments from Tomorrowland 2023 featuring top DJs",
    adminName: "DJ Admin",
    date: "2023-08-15T12:00:00Z",
    source: "YouTube",
    categories: ["Festival Moments", "Vibe Inspo"]
  },
  {
    id: "2",
    type: "spotify",
    embedCode: '<iframe src="https://open.spotify.com/embed/track/2EEeOnHehOozLq4aS0n6SL" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    title: "New Release: Cosmic Journey",
    description: "A deep atmospheric journey through sound",
    adminName: "Music Curator",
    date: "2023-09-02T14:30:00Z",
    source: "Spotify",
    categories: ["Releases", "Chill Vibes"]
  },
  {
    id: "3",
    type: "instagram",
    embedCode: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/CdS9O1Auc-F/" data-instgrm-version="14"><div style="padding:16px;"><p>A post shared by Instagram (@instagram)</p></div></blockquote><script async src="//www.instagram.com/embed.js"></script>',
    title: "Behind the Scenes: Studio Session",
    description: "Exclusive look at the making of the new album",
    adminName: "Producer X",
    date: "2023-07-20T09:15:00Z",
    source: "Instagram",
    categories: ["Artist Spotlight", "Behind The Scenes"]
  },
  {
    id: "4",
    type: "soundcloud",
    embedCode: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/246787345&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
    title: "Exclusive Mix: Deep House Voyage",
    description: "A 2-hour journey into the depths of house music",
    adminName: "Mix Master",
    date: "2023-08-28T16:45:00Z",
    source: "SoundCloud",
    categories: ["Mixes", "Deep House"]
  },
  {
    id: "5",
    type: "twitter",
    embedCode: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just announced: Our next livestream event will feature 12 hours of non-stop beats. Mark your calendars! <a href="https://t.co/example">https://t.co/example</a></p>&mdash; PlayLSD (@playlsd) <a href="https://twitter.com/playlsd/status/1234567890">August 30, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
    title: "Livestream Announcement",
    description: "Details about our upcoming 12-hour livestream event",
    adminName: "Event Manager",
    date: "2023-08-30T11:20:00Z",
    source: "Twitter",
    categories: ["Announcements", "Events"]
  },
  {
    id: "6",
    type: "blog",
    embedCode: '<div class="blog-embed" style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 10px;"><h3 style="margin-bottom: 10px;">The Evolution of Electronic Music</h3><p>Electronic music has come a long way since its inception in the late 1970s...</p><a href="#" style="color: #9b87f5; text-decoration: none;">Read more →</a></div>',
    title: "The Evolution of Electronic Music",
    description: "A comprehensive look at how electronic music has evolved over the decades",
    adminName: "Music Historian",
    date: "2023-09-05T13:10:00Z",
    source: "PlayLSD Blog",
    categories: ["Articles", "History"]
  },
  {
    id: "7",
    type: "youtube",
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DLzxrzFCyOs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    title: "Artist Interview: Future of Techno",
    description: "Exclusive interview with leading techno producers",
    adminName: "DJ Admin",
    date: "2023-08-22T10:00:00Z",
    source: "YouTube",
    categories: ["Artist Spotlight", "Interviews"]
  },
  {
    id: "8",
    type: "spotify",
    embedCode: '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6J5NfMJS675" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    title: "PlayLSD Official Playlist: Underground Gems",
    description: "Our curated collection of underground electronic tracks",
    adminName: "Playlist Curator",
    date: "2023-09-01T15:30:00Z",
    source: "Spotify",
    categories: ["Playlists", "Underground"]
  },
  {
    id: "9",
    type: "html",
    embedCode: '<div class="custom-embed" style="padding: 20px; background: linear-gradient(135deg, rgba(155, 135, 245, 0.2), rgba(30, 174, 219, 0.2)); border-radius: 10px; text-align: center;"><h3 style="margin-bottom: 15px;">PlayLSD Festival 2024</h3><p>The countdown has begun. 3 days of non-stop music across 5 stages.</p><a href="#" style="display: inline-block; margin-top: 15px; padding: 8px 16px; background: rgba(155, 135, 245, 0.5); border-radius: 20px; color: white; text-decoration: none;">Learn More</a></div>',
    title: "PlayLSD Festival 2024 Announcement",
    description: "Details about our upcoming festival",
    adminName: "Event Organizer",
    date: "2023-09-10T09:00:00Z",
    source: "Custom",
    categories: ["Announcements", "Festival Moments"]
  }
];


import React, { useState } from "react";
import { Check, X, MessageSquare, Eye, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Types for the submissions
export type SubmissionType = "song" | "playlist";

export interface Submission {
  id: string;
  type: SubmissionType;
  artistName: string;
  title?: string; // Song title for song submissions
  streamingLink?: string; // For song submissions
  trackLink?: string; // For playlist submissions
  targetPlaylist?: string; // For playlist submissions
  email: string;
  genre: string;
  vibe: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

// Sample submission data
const sampleSubmissions: Submission[] = [
  {
    id: "1",
    type: "song",
    artistName: "Cosmic Waves",
    title: "Journey to Andromeda",
    streamingLink: "https://soundcloud.com/cosmicwaves/journey",
    email: "cosmic@example.com",
    genre: "Ambient",
    vibe: "Dreamy",
    message: "This track was inspired by space exploration imagery",
    status: "pending",
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "2",
    type: "playlist",
    artistName: "Deep Minds",
    trackLink: "https://spotify.com/track/deepminds",
    targetPlaylist: "PlayLSD: Deep Meditation",
    email: "deep@example.com",
    genre: "Deep House",
    vibe: "Hypnotic",
    message: "This track would fit perfectly in your meditation playlist",
    status: "pending",
    date: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: "3",
    type: "song",
    artistName: "Bass Explorer",
    title: "Subterranean",
    streamingLink: "https://soundcloud.com/bassexplorer/subterranean",
    email: "bass@example.com",
    genre: "Bass",
    vibe: "Dark",
    status: "approved",
    date: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: "4",
    type: "playlist",
    artistName: "Morning Rituals",
    trackLink: "https://spotify.com/track/morningrituals",
    targetPlaylist: "PlayLSD: Sunrise Rituals",
    email: "morning@example.com",
    genre: "Melodic Techno",
    vibe: "Uplifting",
    status: "rejected",
    date: new Date(Date.now() - 345600000).toISOString()
  }
];

interface SubmissionCardProps {
  submission: Submission;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onMessage: (id: string, email: string) => void;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ 
  submission, 
  onApprove, 
  onReject,
  onMessage 
}) => {
  const { id, type, artistName, title, streamingLink, trackLink, targetPlaylist, email, genre, vibe, message, status, date } = submission;
  
  return (
    <Card className={`glass-morphism ${status === 'approved' ? 'border-green-500/50' : status === 'rejected' ? 'border-red-500/50' : 'border-playlsd-purple/30'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-gradient-primary">
              {type === "song" ? title : targetPlaylist}
            </CardTitle>
            <CardDescription>
              by {artistName} • {new Date(date).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant={status === "pending" ? "outline" : status === "approved" ? "default" : "destructive"} className={status === "pending" ? "border-amber-500 text-amber-500" : ""}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-playlsd-purple-light text-playlsd-purple-light">
              <Tag className="h-3 w-3 mr-1" />
              {genre}
            </Badge>
            <Badge variant="outline" className="border-playlsd-purple-light text-playlsd-purple-light">
              <Tag className="h-3 w-3 mr-1" />
              {vibe}
            </Badge>
          </div>
          
          <p className="pt-2">
            <strong>Link:</strong>{" "}
            <a 
              href={type === "song" ? streamingLink : trackLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-playlsd-purple-light hover:underline"
            >
              {type === "song" ? streamingLink : trackLink}
            </a>
          </p>
          
          {type === "playlist" && (
            <p>
              <strong>Target Playlist:</strong> {targetPlaylist}
            </p>
          )}
          
          <p>
            <strong>Email:</strong> {email}
          </p>
          
          {message && (
            <div className="pt-2">
              <p className="font-semibold">Message:</p>
              <p className="italic">{message}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {status === "pending" && (
          <>
            <Button 
              variant="outline"
              size="sm"
              className="border-red-500 hover:bg-red-500/10 text-red-400"
              onClick={() => onReject(id)}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="border-green-500 hover:bg-green-500/10 text-green-400"
              onClick={() => onApprove(id)}
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          className="border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
          onClick={() => onMessage(id, email)}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Message
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const SubmissionReview: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const storedSubmissions = localStorage.getItem('adminSubmissions');
    return storedSubmissions ? JSON.parse(storedSubmissions) : sampleSubmissions;
  });
  const { toast } = useToast();

  // Update localStorage whenever submissions change
  React.useEffect(() => {
    localStorage.setItem('adminSubmissions', JSON.stringify(submissions));
  }, [submissions]);

  const approveSubmission = (id: string) => {
    const updatedSubmissions = submissions.map(submission => 
      submission.id === id ? { ...submission, status: "approved" } : submission
    );
    setSubmissions(updatedSubmissions);
    toast({
      title: "Submission Approved",
      description: "The submission has been approved successfully."
    });
  };

  const rejectSubmission = (id: string) => {
    const updatedSubmissions = submissions.map(submission => 
      submission.id === id ? { ...submission, status: "rejected" } : submission
    );
    setSubmissions(updatedSubmissions);
    toast({
      title: "Submission Rejected",
      description: "The submission has been rejected."
    });
  };

  const messageSubmitter = (id: string, email: string) => {
    toast({
      title: "Message Feature",
      description: `In a full implementation, you would be able to send a message to ${email}.`
    });
  };

  const pendingSubmissions = submissions.filter(s => s.status === "pending");
  const approvedSubmissions = submissions.filter(s => s.status === "approved");
  const rejectedSubmissions = submissions.filter(s => s.status === "rejected");
  
  const songSubmissions = submissions.filter(s => s.type === "song");
  const playlistSubmissions = submissions.filter(s => s.type === "playlist");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gradient-primary">Submission Review</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-playlsd-purple/10 border-playlsd-purple text-white">
            {pendingSubmissions.length} Pending
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 border-green-500 text-white">
            {approvedSubmissions.length} Approved
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 border-red-500 text-white">
            {rejectedSubmissions.length} Rejected
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="glass-morphism">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 pt-4">
          {submissions.length > 0 ? (
            submissions.map(submission => (
              <SubmissionCard 
                key={submission.id}
                submission={submission}
                onApprove={approveSubmission}
                onReject={rejectSubmission}
                onMessage={messageSubmitter}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">No submissions available.</p>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4 pt-4">
          {pendingSubmissions.length > 0 ? (
            pendingSubmissions.map(submission => (
              <SubmissionCard 
                key={submission.id}
                submission={submission}
                onApprove={approveSubmission}
                onReject={rejectSubmission}
                onMessage={messageSubmitter}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">No pending submissions available.</p>
          )}
        </TabsContent>
        
        <TabsContent value="songs" className="space-y-4 pt-4">
          {songSubmissions.length > 0 ? (
            songSubmissions.map(submission => (
              <SubmissionCard 
                key={submission.id}
                submission={submission}
                onApprove={approveSubmission}
                onReject={rejectSubmission}
                onMessage={messageSubmitter}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">No song submissions available.</p>
          )}
        </TabsContent>
        
        <TabsContent value="playlists" className="space-y-4 pt-4">
          {playlistSubmissions.length > 0 ? (
            playlistSubmissions.map(submission => (
              <SubmissionCard 
                key={submission.id}
                submission={submission}
                onApprove={approveSubmission}
                onReject={rejectSubmission}
                onMessage={messageSubmitter}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">No playlist submissions available.</p>
          )}
        </TabsContent>

        <TabsContent value="table" className="pt-4">
          <Card className="glass-morphism">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Title/Playlist</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map(submission => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {new Date(submission.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-playlsd-purple/10 border-playlsd-purple-light text-playlsd-purple-light">
                          {submission.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{submission.artistName}</TableCell>
                      <TableCell>
                        {submission.type === "song" ? submission.title : submission.targetPlaylist}
                      </TableCell>
                      <TableCell>{submission.genre}</TableCell>
                      <TableCell>
                        <Badge variant={submission.status === "pending" ? "outline" : submission.status === "approved" ? "default" : "destructive"} className={submission.status === "pending" ? "border-amber-500 text-amber-500" : ""}>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-1">
                          {submission.status === "pending" && (
                            <>
                              <Button 
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 border-red-500 hover:bg-red-500/10 text-red-400"
                                onClick={() => rejectSubmission(submission.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 border-green-500 hover:bg-green-500/10 text-green-400"
                                onClick={() => approveSubmission(submission.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
                            onClick={() => messageSubmitter(submission.id, submission.email)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubmissionReview;

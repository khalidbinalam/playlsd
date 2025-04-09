import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckIcon, XIcon, SearchIcon, Filter, ListMusic, Music, ExternalLink } from "lucide-react";
import { useSubmissions } from "@/hooks/use-submissions";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

export type SubmissionType = 'song' | 'playlist';

export interface Submission {
  id: string;
  type: SubmissionType;
  artistName: string;
  title?: string;
  streamingLink?: string;
  trackLink?: string;
  targetPlaylist?: string;
  email: string;
  genre: string;
  vibe: string;
  message?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const SubmissionReview: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<SubmissionType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<"pending" | "approved" | "rejected" | "all">("all");
  const { toast } = useToast();
  
  const { submissions, loading, updateSubmissionStatus } = useSubmissions();

  const handleStatusChange = (id: string, status: "pending" | "approved" | "rejected") => {
    updateSubmissionStatus(id, status);
    
    const submission = submissions.find(sub => sub.id === id);
    if (submission) {
      toast({
        title: `Submission ${status}`,
        description: `Submission from ${submission.artistName} has been ${status}.`,
      });
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch =
      submission.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (submission.title && submission.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || submission.type === filterType;
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const pendingSubmissions = filteredSubmissions.filter(submission => submission.status === "pending");
  const approvedSubmissions = filteredSubmissions.filter(submission => submission.status === "approved");
  const rejectedSubmissions = filteredSubmissions.filter(submission => submission.status === "rejected");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gradient-primary">Submissions</h2>
      </div>

      <div className="glass-morphism rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-2">
            <Label htmlFor="search" className="sr-only">Search</Label>
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-playlsd-dark/50 border-playlsd-purple/30"
            />
          </div>
          
          <div>
            <Label htmlFor="type-filter" className="sr-only">Filter by Type</Label>
            <Select value={filterType} onValueChange={(value) => setFilterType(value as SubmissionType | "all")}>
              <SelectTrigger id="type-filter" className="bg-playlsd-dark/50 border-playlsd-purple/30">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="song">Song Submissions</SelectItem>
                <SelectItem value="playlist">Playlist Submissions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status-filter" className="sr-only">Filter by Status</Label>
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as "pending" | "approved" | "rejected" | "all")}>
              <SelectTrigger id="status-filter" className="bg-playlsd-dark/50 border-playlsd-purple/30">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
                <SelectItem value="approved">Approved Only</SelectItem>
                <SelectItem value="rejected">Rejected Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading submissions...</p>
        </div>
      ) : (
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="glass-morphism">
            <TabsTrigger value="pending">
              Pending ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedSubmissions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-6">
            {pendingSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No pending submissions found.</p>
              </div>
            ) : (
              <SubmissionTable 
                submissions={pendingSubmissions} 
                onStatusChange={handleStatusChange} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="approved" className="mt-6">
            {approvedSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No approved submissions found.</p>
              </div>
            ) : (
              <SubmissionTable 
                submissions={approvedSubmissions} 
                onStatusChange={handleStatusChange} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-6">
            {rejectedSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No rejected submissions found.</p>
              </div>
            ) : (
              <SubmissionTable 
                submissions={rejectedSubmissions} 
                onStatusChange={handleStatusChange} 
              />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

interface SubmissionTableProps {
  submissions: Submission[];
  onStatusChange: (id: string, status: "pending" | "approved" | "rejected") => void;
}

const SubmissionTable: React.FC<SubmissionTableProps> = ({ submissions, onStatusChange }) => {
  return (
    <Table className="glass-morphism">
      <TableCaption>A list of your submissions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Track Info</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Vibe</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell className="font-medium">
              {submission.type === 'song' ? (
                <div className="flex items-center">
                  <Music className="mr-2 h-4 w-4" />
                  Song
                </div>
              ) : (
                <div className="flex items-center">
                  <ListMusic className="mr-2 h-4 w-4" />
                  Playlist
                </div>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{submission.artistName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{submission.artistName}</span>
              </div>
            </TableCell>
            <TableCell>
              <Accordion type="single" collapsible>
                <AccordionItem value={submission.id}>
                  <AccordionTrigger>
                    {submission.title || "No Title"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="glass-morphism">
                      <CardHeader>
                        <CardTitle>Submission Details</CardTitle>
                        <CardDescription>
                          Submitted on {new Date(submission.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className="flex items-center space-x-4">
                          {submission.streamingLink && (
                            <Button variant="secondary" size="sm" asChild>
                              <a href={submission.streamingLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                Streaming Link <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {submission.trackLink && (
                            <Button variant="secondary" size="sm" asChild>
                              <a href={submission.trackLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                Track Link <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        {submission.targetPlaylist && (
                          <div className="grid gap-1">
                            <div className="text-sm font-medium">Target Playlist</div>
                            <div className="text-gray-400">{submission.targetPlaylist}</div>
                          </div>
                        )}
                        
                        <div className="grid gap-1">
                          <div className="text-sm font-medium">Email</div>
                          <div className="text-gray-400">{submission.email}</div>
                        </div>
                        
                        {submission.message && (
                          <div className="grid gap-1">
                            <div className="text-sm font-medium">Message</div>
                            <div className="text-gray-400">{submission.message}</div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="justify-between">
                        <Badge variant="outline">{submission.status}</Badge>
                      </CardFooter>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
            <TableCell>{submission.genre}</TableCell>
            <TableCell>{submission.vibe}</TableCell>
            <TableCell className="text-right">
              {submission.status === "pending" ? (
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStatusChange(submission.id, "approved")}
                  >
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    Approve
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStatusChange(submission.id, "rejected")}
                  >
                    <XIcon className="h-4 w-4 text-red-500" />
                    Reject
                  </Button>
                </div>
              ) : (
                <Badge>{submission.status}</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubmissionReview;

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, MapPin, Clock, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data - will be replaced with Supabase data
const mockSubmissionDetail = {
  id: 1,
  restaurantName: "Tony's Pizza Palace",
  submittedAt: "2024-01-15",
  status: "submitted",
  businessInfo: {
    name: "Tony's Pizza Palace",
    address: "123 Main St, New York, NY 10001",
    email: "tony@pizzapalace.com",
    phone: "(555) 123-4567",
    website: "https://tonys-pizza.com"
  },
  about: {
    foundedYear: "1985",
    story: "Tony's Pizza Palace has been serving authentic New York-style pizza for over 35 years. Started by Tony Marinelli, an immigrant from Naples, we've maintained the traditional recipes passed down through generations while creating new favorites for our loyal customers.",
    ownerQuote: "Every pizza we make is a piece of our family's heritage. We don't just serve food, we serve memories.",
    aboutImage: "/mock-about-image.jpg"
  },
  popularDishes: [
    {
      name: "Classic Margherita",
      description: "Fresh mozzarella, San Marzano tomatoes, and basil on our signature thin crust",
      image: "/mock-dish1.jpg"
    },
    {
      name: "Tony's Special",
      description: "Pepperoni, Italian sausage, mushrooms, bell peppers, and onions",
      image: "/mock-dish2.jpg"
    },
    {
      name: "White Pizza Bianca",
      description: "Ricotta, mozzarella, garlic, and olive oil with fresh herbs",
      image: "/mock-dish3.jpg"
    }
  ],
  menuPdf: {
    name: "tonys-menu-2024.pdf",
    size: "2.4 MB",
    url: "/mock-menu.pdf"
  },
  deliveryHours: {
    deliveryAreas: "Manhattan: 10001, 10002, 10003, 10004, 10005\nBrooklyn: 11201, 11205, 11215",
    instructions: "Please call when you arrive. Free delivery on orders over $25. $3 delivery fee for orders under $25.",
    hours: "Monday: 11AM - 10PM\nTuesday: 11AM - 10PM\nWednesday: 11AM - 10PM\nThursday: 11AM - 11PM\nFriday: 11AM - 11PM\nSaturday: 12PM - 11PM\nSunday: 12PM - 9PM"
  },
  photos: [
    "/mock-photo1.jpg",
    "/mock-photo2.jpg",
    "/mock-photo3.jpg",
    "/mock-photo4.jpg",
    "/mock-photo5.jpg"
  ],
  social: {
    instagram: "@tonyspizzapalace",
    facebook: "Tony's Pizza Palace NYC",
    twitter: "@tonyspizza",
    comments: "Would love to highlight our wood-fired oven in the design. It's our main attraction!"
  }
};

const statusColors = {
  submitted: "bg-blue-100 text-blue-800",
  "in-review": "bg-yellow-100 text-yellow-800",
  generated: "bg-green-100 text-green-800",
  live: "bg-purple-100 text-purple-800"
};

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const submission = mockSubmissionDetail; // In real app, fetch by id

  const handleGenerateSite = () => {
    // This will trigger the site generation process
    console.log("Generating site for:", submission.restaurantName);
    // Update status to "generated" and trigger site creation
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{submission.restaurantName}</h1>
              <p className="text-muted-foreground">Submitted on {submission.submittedAt}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className={statusColors[submission.status as keyof typeof statusColors]}>
              {submission.status.replace("-", " ")}
            </Badge>
            {submission.status === "submitted" && (
              <Button onClick={handleGenerateSite}>
                Generate Site
              </Button>
            )}
          </div>
        </div>

        {/* Business Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{submission.businessInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{submission.businessInfo.email}</p>
                </div>
              </div>
              {submission.businessInfo.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{submission.businessInfo.phone}</p>
                  </div>
                </div>
              )}
              {submission.businessInfo.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a href={submission.businessInfo.website} target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline">
                      {submission.businessInfo.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About the Restaurant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Founded</p>
              <p className="font-semibold">{submission.about.foundedYear}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Restaurant Story</p>
              <p className="leading-relaxed">{submission.about.story}</p>
            </div>
            {submission.about.ownerQuote && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Owner Quote</p>
                <blockquote className="italic border-l-4 border-primary pl-4">
                  "{submission.about.ownerQuote}"
                </blockquote>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Dishes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Popular Dishes ({submission.popularDishes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {submission.popularDishes.map((dish, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{dish.name}</h4>
                  <p className="text-sm text-muted-foreground">{dish.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu PDF */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Menu PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{submission.menuPdf.name}</p>
                <p className="text-sm text-muted-foreground">{submission.menuPdf.size}</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hours & Delivery */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hours & Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Hours of Operation</p>
              <pre className="text-sm whitespace-pre-line">{submission.deliveryHours.hours}</pre>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Delivery Areas</p>
              <pre className="text-sm whitespace-pre-line">{submission.deliveryHours.deliveryAreas}</pre>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Instructions</p>
              <p className="text-sm">{submission.deliveryHours.instructions}</p>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Restaurant Photos ({submission.photos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {submission.photos.map((photo, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Photo {index + 1}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social & Comments */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media & Additional Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {submission.social.instagram && (
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <p>{submission.social.instagram}</p>
                </div>
              )}
              {submission.social.facebook && (
                <div>
                  <p className="text-sm text-muted-foreground">Facebook</p>
                  <p>{submission.social.facebook}</p>
                </div>
              )}
              {submission.social.twitter && (
                <div>
                  <p className="text-sm text-muted-foreground">Twitter</p>
                  <p>{submission.social.twitter}</p>
                </div>
              )}
            </div>
            {submission.social.comments && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Additional Comments</p>
                  <p className="text-sm leading-relaxed">{submission.social.comments}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
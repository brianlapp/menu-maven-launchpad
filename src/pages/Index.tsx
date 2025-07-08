import { ArrowRight, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
const menuLogo = "https://i.imgur.com/AYyrnpP.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <img src={menuLogo} alt="Menu.ca" className="w-64 h-auto mb-8 p-4 bg-white rounded-lg" />
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Join our restaurant directory and tell us about your business
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/onboarding')}
          >
            Share Your Restaurant Info
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect Your Restaurant with Our Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your restaurant's story, menu, and details to join our growing directory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Simple Survey</h3>
                <p className="text-muted-foreground">
                  Tell us about your restaurant in 10-15 minutes with our easy form
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Listing</h3>
                <p className="text-muted-foreground">
                  Your restaurant information organized and presented beautifully
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Get Discovered</h3>
                <p className="text-muted-foreground">
                  Join our directory and connect with customers looking for great food
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-warm py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Directory?
          </h2>
          <p className="text-xl mb-8">
            Share your restaurant's story and connect with food lovers in your area
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={() => navigate('/onboarding')}
          >
            Tell Us About Your Restaurant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

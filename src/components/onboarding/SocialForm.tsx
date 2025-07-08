import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Facebook, Twitter } from "lucide-react";

interface SocialData {
  instagram: string;
  facebook: string;
  twitter: string;
  comments: string;
}

interface SocialFormProps {
  data: SocialData;
  onChange: (data: SocialData) => void;
}

export function SocialForm({ data, onChange }: SocialFormProps) {
  const updateField = (field: keyof SocialData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground">
          Connect your social media accounts and add any final comments or requests.
          All fields in this section are optional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Instagram className="w-5 h-5 text-pink-500" />
            <Label htmlFor="instagram" className="text-base font-medium">
              Instagram
            </Label>
          </div>
          <Input
            id="instagram"
            placeholder="@yourrestaurant or full URL"
            value={data.instagram}
            onChange={(e) => updateField('instagram', e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Facebook className="w-5 h-5 text-blue-500" />
            <Label htmlFor="facebook" className="text-base font-medium">
              Facebook
            </Label>
          </div>
          <Input
            id="facebook"
            placeholder="Page name or full URL"
            value={data.facebook}
            onChange={(e) => updateField('facebook', e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Twitter className="w-5 h-5 text-blue-400" />
            <Label htmlFor="twitter" className="text-base font-medium">
              Twitter/X
            </Label>
          </div>
          <Input
            id="twitter"
            placeholder="@handle or full URL"
            value={data.twitter}
            onChange={(e) => updateField('twitter', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="comments" className="text-base font-medium">
          Additional Comments or Requests
        </Label>
        <Textarea
          id="comments"
          placeholder="Any special requests, additional information, or questions for our team? We'll review everything and may reach out if we need clarification."
          value={data.comments}
          onChange={(e) => updateField('comments', e.target.value)}
          className="mt-2 min-h-24"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Let us know about any specific features, design preferences, or functionality you'd like
        </p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">🎉 Almost Done!</h3>
        <p className="text-muted-foreground">
          You're one step away from having your professional restaurant website. 
          Click "Submit" to send us your information and we'll get started on creating your site.
        </p>
      </div>
    </div>
  );
}
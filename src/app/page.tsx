"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function HomePage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleStartNew = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/cases", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create case");
      }

      const { caseId, resumeToken } = await response.json();
      router.push(`/questionnaire/${caseId}?token=${resumeToken}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsCreating(false);
    }
  };

  const handleResume = () => {
    if (!resumeUrl.trim()) {
      setError("Please enter a resume URL");
      return;
    }

    try {
      const url = new URL(resumeUrl);
      router.push(url.pathname + url.search);
    } catch {
      // If it's not a full URL, try to extract the path
      const questionnaireMatch = resumeUrl.match(/\/questionnaire\/([^?]+)(\?.*)?/);
      if (questionnaireMatch) {
        router.push(`/questionnaire/${questionnaireMatch[1]}${questionnaireMatch[2] || ""}`);
        return;
      }
      const dashboardMatch = resumeUrl.match(/\/dashboard\/([^?]+)(\?.*)?/);
      if (dashboardMatch) {
        router.push(`/dashboard/${dashboardMatch[1]}${dashboardMatch[2] || ""}`);
        return;
      }
      setError("Invalid resume URL");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            O-1 Visa Case Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;ll guide you step-by-step through collecting evidence for your
            O-1 extraordinary ability visa application.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Start New */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Ready to start?
            </h2>
            <p className="text-gray-600 mb-6">
              Click below to begin building your O-1 case. You can save your
              progress at any time and resume later.
            </p>
            <Button
              size="lg"
              onClick={handleStartNew}
              isLoading={isCreating}
              className="px-8"
            >
              Start New Case
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          {/* Resume Existing */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Resume existing case
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Have a saved progress link? Paste it below to continue where you
              left off.
            </p>
            <div className="flex gap-3">
              <Input
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="Paste your resume link here..."
                className="flex-1"
              />
              <Button variant="outline" onClick={handleResume}>
                Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard
            title="Step-by-Step Guidance"
            description="We break down the complex O-1 requirements into manageable steps, explaining what's needed at each stage."
            icon="📋"
          />
          <InfoCard
            title="Save Your Progress"
            description="Don't have all your documents ready? Save your progress and come back anytime with your unique link."
            icon="💾"
          />
          <InfoCard
            title="Evidence Tips"
            description="Get guidance on what makes strong evidence for each criterion, with examples of what USCIS is looking for."
            icon="💡"
          />
        </div>

        {/* O-1 Info */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            About the O-1 Visa
          </h2>
          <p className="text-gray-600 mb-4">
            The O-1 visa is for individuals with{" "}
            <strong>extraordinary ability</strong> in sciences, education,
            business, or athletics. To qualify, you must demonstrate evidence
            for at least <strong>3 of 8 criteria</strong> defined by USCIS.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">The 8 Criteria:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1. Nationally/internationally recognized awards</li>
                <li>2. Membership in distinguished organizations</li>
                <li>3. Published material about you in media</li>
                <li>4. Judging the work of others</li>
                <li>5. Original contributions of major significance</li>
                <li>6. Scholarly authorship</li>
                <li>7. Critical employment at distinguished orgs</li>
                <li>8. High remuneration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">What We Collect:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your basic demographic information</li>
                <li>• Evidence for your chosen criteria</li>
                <li>• Supporting documents (via URLs)</li>
                <li>• Context about your achievements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

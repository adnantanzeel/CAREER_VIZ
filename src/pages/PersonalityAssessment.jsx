"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ParticleBackground from "@/components/ParticleBackground";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Brain,
  Home,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const ageCategories = [
  { value: "10-14", label: "10-14 years" },
  { value: "15-18", label: "15-18 years" },
  { value: "19-24", label: "19-24 years" },
];

const questions = [
  {
    id: 1,
    question: "When faced with a problem, I prefer to:",
    options: [
      { text: "Analyze data and find logical solutions", type: "Analytical" },
      { text: "Brainstorm creative ideas", type: "Creative" },
      { text: "Discuss with others and lead the team", type: "Leadership" },
      { text: "Build or fix things hands-on", type: "Technical" },
    ],
  },
  {
    id: 2,
    question: "In group projects, I usually:",
    options: [
      { text: "Take charge and organize everyone", type: "Leadership" },
      { text: "Come up with unique ideas", type: "Creative" },
      { text: "Focus on research and details", type: "Analytical" },
      { text: "Handle the technical aspects", type: "Technical" },
    ],
  },
  {
    id: 3,
    question: "My ideal weekend activity would be:",
    options: [
      { text: "Reading books or solving puzzles", type: "Analytical" },
      { text: "Creating art, music, or writing", type: "Creative" },
      { text: "Organizing events or meeting friends", type: "Leadership" },
      { text: "Building models or coding projects", type: "Technical" },
    ],
  },
  {
    id: 4,
    question: "I feel most accomplished when I:",
    options: [
      { text: "Solve a complex problem", type: "Analytical" },
      { text: "Create something new and original", type: "Creative" },
      { text: "Help others achieve their goals", type: "Leadership" },
      { text: "Make something work perfectly", type: "Technical" },
    ],
  },
  {
    id: 5,
    question: "My friends would describe me as:",
    options: [
      { text: "Logical and detail-oriented", type: "Analytical" },
      { text: "Imaginative and artistic", type: "Creative" },
      { text: "Confident and inspiring", type: "Leadership" },
      { text: "Practical and skilled", type: "Technical" },
    ],
  },
  {
    id: 6,
    question: "When learning something new, I prefer:",
    options: [
      { text: "Step-by-step logical explanations", type: "Analytical" },
      { text: "Visual and creative presentations", type: "Creative" },
      { text: "Group discussions and debates", type: "Leadership" },
      { text: "Hands-on practice and experiments", type: "Technical" },
    ],
  },
];

const PersonalityAssessment = () => {
  const router = useRouter();
  const [ageCategory, setAgeCategory] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    if (!ageCategory) {
      toast.error("Please select your age category");
      return;
    }
    setStarted(true);
  };

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers) => {
    const counts = {};
    allAnswers.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    const maxType = Object.entries(counts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    const results = {
      Analytical: {
        description: "You have a strong analytical mind with excellent problem-solving abilities. You thrive when working with data, logic, and structured approaches.",
        careers: ["Data Scientist", "Research Scientist", "Financial Analyst", "Doctor", "Engineer"],
      },
      Creative: {
        description: "You possess exceptional creativity and imagination. You excel at thinking outside the box and bringing innovative ideas to life.",
        careers: ["Graphic Designer", "Writer/Author", "Architect", "Film Director", "UX Designer"],
      },
      Leadership: {
        description: "You are a natural leader with strong communication and organizational skills. You inspire others and excel at managing teams and projects.",
        careers: ["IAS Officer", "Business Manager", "Entrepreneur", "HR Director", "Teacher/Professor"],
      },
      Technical: {
        description: "You have strong technical aptitude and enjoy working with your hands. You excel at building, fixing, and optimizing systems.",
        careers: ["Software Engineer", "Mechanical Engineer", "Robotics Engineer", "Electrician", "Surgeon"],
      },
    };

    setResult({
      type: maxType,
      ...results[maxType],
    });
    setCompleted(true);
    toast.success("Assessment completed!");
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <Logo size="md" />
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </Link>
      </nav>

      <main className="relative z-10 px-6 py-12 max-w-3xl mx-auto">
        {!started ? (
          /* Start Screen */
          <div className="text-center animate-fadeIn">
            <div className="glass-card p-8 lg:p-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-6">
                <Brain size={40} className="text-primary" />
              </div>

              <h1 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                <span className="neon-text">Personality</span> Assessment
              </h1>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Discover your personality type and get matched with careers that align with your natural strengths and interests.
              </p>

              <div className="max-w-xs mx-auto mb-8">
                <Select value={ageCategory} onValueChange={setAgeCategory}>
                  <SelectTrigger className="h-12 bg-muted/30 border-border/50">
                    <SelectValue placeholder="Select your age group" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="hero" size="xl" onClick={handleStart}>
                <Sparkles size={20} />
                Start Assessment
                <ArrowRight size={20} />
              </Button>

              <p className="text-sm text-muted-foreground mt-6">
                ⏱️ Takes about 5 minutes • 6 questions
              </p>
            </div>
          </div>
        ) : completed && result ? (
          /* Results Screen */
          <div className="animate-fadeIn">
            <div className="glass-card p-8 lg:p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary mb-6">
                <CheckCircle size={40} className="text-secondary" />
              </div>

              <h2 className="text-2xl font-display font-bold mb-2">
                Your Personality Type
              </h2>
              <div className="inline-block px-6 py-3 rounded-full glass-card neon-border mb-6">
                <span className="text-3xl font-display font-bold neon-text">
                  {result.type}
                </span>
              </div>

              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                {result.description}
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-display font-semibold mb-4 neon-text-green">
                  Recommended Careers
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {result.careers.map((career) => (
                    <span key={career} className="badge-success">
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/career-visualization">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft size={18} />
                    Explore More Careers
                  </Button>
                </Link>
                <Button
                  variant="neon"
                  onClick={() => {
                    setStarted(false);
                    setCompleted(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setResult(null);
                    setAgeCategory("");
                  }}
                >
                  Take Again
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Question Screen */
          <div className="animate-fadeIn">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="progress-neon">
                <div
                  className="progress-neon-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="glass-card p-8">
              <h2 className="text-xl lg:text-2xl font-display font-semibold mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.type)}
                    className="w-full p-4 text-left rounded-xl glass-card-hover border border-border/30 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-sm font-semibold group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PersonalityAssessment;


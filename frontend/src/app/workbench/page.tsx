"use client";

import { useState } from "react";

interface ZyncResponse {
  status: string;
  metrics?: {
    niche_processed: string;
    total_pipeline_latency_ms: number;
    active_policies_enforced: number;
  };
  policy_evaluation?: {
    brand_safety_score?: string;
    competitor_mention_blocked?: boolean;
    unverified_claims_flagged?: boolean;
    tone_alignment?: string;
    status?: string;
    reason?: string;
  };
  agent_execution_logs?: {
    [key: string]: { status: string; latency_ms: number; capability_used: string };
  };
  distribution?: {
    [key: string]: { content: string; scheduled_utc: string };
  };
  pipeline_governance?: {
    error_trace: string;
    action: string;
    routing_target: string;
  };
  error_code?: string;
  reason?: string;
  deployment_authorized?: boolean;
}

export default function Workbench() {
  const [niche, setNiche] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ZyncResponse | null>(null);
  const [isException, setIsException] = useState<boolean>(false);
  const [isViolation, setIsViolation] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const runZyncEngine = async () => {
    if (!niche) {
      alert("Bhai, pehle Target Niche ya URL toh daalo!");
      return;
    }
    
    setIsProcessing(true);
    setApiResponse(null);
    setIsException(false);
    setIsViolation(false);
    setIsInvalid(false);

    // 🛡️ PATH 0: GARBAGE INPUT VALIDATION GATE
    const meaningfulLetters = niche.replace(/[^a-zA-Z]/g, "").length;
    if (meaningfulLetters < 3) {
      await new Promise((resolve) => setTimeout(resolve, 600)); // Slick realistic evaluation delay
      setIsInvalid(true);
      setApiResponse({
        status: "INVALID_INPUT_REJECTED",
        error_code: "INPUT_VALIDATION_FAILED",
        reason: "Campaign request contains no meaningful business context or alphabetic words.",
        deployment_authorized: false
      });
      setIsProcessing(false);
      return;
    }

    const inputLower = niche.toLowerCase();

    try {
      // 🔴 PATH 1: TECHNICAL EXCEPTION (Type "error" or "broken")
      if (inputLower.includes("broken") || inputLower.includes("error")) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        throw new Error("ERR_CORE_CAPABILITY_TIMEOUT: Supervity Headless Web-Search pipeline failed to resolve target asset within execution threshold.");
      }

      // ⚠️ PATH 2: POLICY VIOLATION INTERCEPT (Type "violation" or "starbucks")
      if (inputLower.includes("violation") || inputLower.includes("starbuck") || inputLower.includes("mcdonald")) {
        await new Promise((resolve) => setTimeout(resolve, 1400));
        
        setIsViolation(true);
        setApiResponse({
          status: "DEPLOYMENT_BLOCKED_BY_GOVERNANCE",
          metrics: {
            niche_processed: niche,
            total_pipeline_latency_ms: 760,
            active_policies_enforced: 3
          },
          policy_evaluation: {
            status: "FAILED_COMPLIANCE_AUDIT",
            brand_safety_score: "42/100 (CRITICAL_FAIL)",
            competitor_mention_blocked: true,
            unverified_claims_flagged: true,
            tone_alignment: "REJECTED - Restricted competitor trade-tokens or unauthorized pricing claims detected."
          },
          agent_execution_logs: {
            "1_Zync_Multi_Channel_Content (Research Phase)": { status: "COMPLETED", latency_ms: 450, capability_used: "Supervity Headless Web-Search" },
            "2_Zync_Brand_Safety_Evaluator": { status: "FAILED_COMPLIANCE_CHECK", latency_ms: 310, capability_used: "Dynamic Corporate Policy Guardrails" },
            "3_Zync_Multi_Channel_Content (Generation Phase)": { status: "SKIPPED_BY_GOVERNANCE", latency_ms: 0, capability_used: "N/A" },
            "4_Zync_Content_Publisher": { status: "SKIPPED_BY_GOVERNANCE", latency_ms: 0, capability_used: "N/A" }
          },
          pipeline_governance: {
            error_trace: "POLICY_VIOLATION: Restricted competitive keyword entities detected during active scraping phase.",
            action: "Automated distribution sequences frozen instantly to protect brand compliance standards.",
            routing_target: "Payload quarantined and routed to Supervity Compliance Workbench for manual human-in-the-loop override."
          },
          distribution: {}
        });
        return;
      }

      // 🟢 PATH 3: STANDARD HAPPY PATH
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockEnhancedData: ZyncResponse = {
        status: "READY_FOR_DEPLOYMENT",
        metrics: {
          niche_processed: niche,
          total_pipeline_latency_ms: 1420,
          active_policies_enforced: 3
        },
        policy_evaluation: {
          brand_safety_score: "98/100",
          competitor_mention_blocked: true,
          unverified_claims_flagged: false,
          tone_alignment: "Professional Growth-Oriented"
        },
        agent_execution_logs: {
          "1_Zync_Multi_Channel_Content (Research Phase)": { status: "COMPLETED", latency_ms: 450, capability_used: "Supervity Headless Web-Search & Deep Research" },
          "2_Zync_Brand_Safety_Evaluator": { status: "COMPLETED", latency_ms: 310, capability_used: "Dynamic Corporate Policy Guardrails" },
          "3_Zync_Multi_Channel_Content (Generation Phase)": { status: "COMPLETED", latency_ms: 380, capability_used: "Contextual Multi-Platform Copy Generator" },
          "4_Zync_Content_Publisher": { status: "COMPLETED", latency_ms: 280, capability_used: "Automated Scheduler & API Distribution Hub" }
        },
        distribution: {
          twitter: {
            content: `Why wait for tomorrow when you can scale today? Empowering your workflow at ${niche}. #Innovation #Growth`,
            scheduled_utc: "2026-05-16 11:00:00"
          },
          linkedin: {
            content: `The traditional model is evolving. Adopting decentralized execution chains at ${niche} is the ultimate competitive edge.`,
            scheduled_utc: "2026-05-16 11:15:00"
          }
        }
      };

      setApiResponse(mockEnhancedData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown socket connection failure.";
      setIsException(true);
      
      setApiResponse({
        status: "CRITICAL_EXCEPTION_HANDLED",
        metrics: {
          niche_processed: niche,
          total_pipeline_latency_ms: 1200,
          active_policies_enforced: 0
        },
        policy_evaluation: {
          status: "NOT_EXECUTED",
          reason: "UPSTREAM_CORE_CAPABILITY_TIMEOUT"
        },
        agent_execution_logs: {
          "1_Zync_Multi_Channel_Content (Research Phase)": { status: "FAILED", latency_ms: 1200, capability_used: "Supervity Headless Web-Search Gateway" },
          "2_Zync_Brand_Safety_Evaluator": { status: "BLOCKED_DEPENDENCY_FAILURE", latency_ms: 0, capability_used: "N/A" },
          "3_Zync_Multi_Channel_Content (Generation Phase)": { status: "BLOCKED_DEPENDENCY_FAILURE", latency_ms: 0, capability_used: "N/A" },
          "4_Zync_Content_Publisher": { status: "BLOCKED_DEPENDENCY_FAILURE", latency_ms: 0, capability_used: "N/A" }
        },
        pipeline_governance: {
          error_trace: errorMessage,
          action: "Automated pipeline production deployment frozen instantly to secure system runtime.",
          routing_target: "State payload successfully serialized and routed to Supervity Human-in-Command Hub."
        },
        distribution: {}
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 text-[#1e293b]">
      <div className="mb-4 text-sm text-slate-500 flex items-center gap-2">
        <span>Dashboard</span> <span>&gt;</span> <span className="text-slate-800 font-medium">Workbench</span>
      </div>

      <h1 className="text-4xl font-bold text-[#0f172a] tracking-tight mb-1">Workbench</h1>
      <p className="text-slate-500 mb-8">Access your AI tools and automation workflows.</p>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-[#0f172a] mb-1">Zync Marketing Autonomous Pipeline</h2>
        <p className="text-sm text-slate-500 mb-6">Apna campaign niche enter karke ek sath 4 powerful AI agents ko parallel trigger karo.</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
            placeholder="e.g., Zync Studio / Amigos Cafeteria / Starbucks"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            disabled={isProcessing}
          />
          <button
            onClick={runZyncEngine}
            disabled={isProcessing}
            className="bg-[#0f172a] hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:bg-slate-400"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Engine Running...
              </>
            ) : (
              "Run Zync Engine 🚀"
            )}
          </button>
        </div>

        {apiResponse && (
          <div className={`mt-6 rounded-xl border p-4 transition-all ${isException || isViolation || isInvalid ? 'border-red-200 bg-red-50/50' : 'border-green-200 bg-green-50/50'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-bold tracking-wide uppercase ${isException || isViolation || isInvalid ? 'text-red-700' : 'text-green-700'}`}>
                Engine Status: {apiResponse.status}
              </span>
            </div>
            
            <div className="bg-[#0f172a] text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed max-h-[500px]">
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 text-lg">🤖</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">AI Assistant</h3>
            <p className="text-xs text-slate-500 leading-normal mb-6">Chat with your AI assistant for help with operational workflows.</p>
          </div>
          <button className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-medium text-xs py-2.5 rounded-xl transition-all">Open Tool &rarr;</button>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 text-lg">⚙️</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Automation Builder</h3>
            <p className="text-xs text-slate-500 leading-normal mb-6">Create, manage, and configure stateful automated workflows.</p>
          </div>
          <button className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-medium text-xs py-2.5 rounded-xl transition-all">Open Tool &rarr;</button>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm opacity-70 relative flex flex-col justify-between">
          <span className="absolute top-4 right-4 bg-slate-100 text-slate-600 font-semibold tracking-wide text-[10px] uppercase px-2 py-0.5 rounded-md">Coming Soon</span>
          <div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 text-lg">📊</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Analytics Dashboard</h3>
            <p className="text-xs text-slate-500 leading-normal mb-6">View detailed live execution logs, operational traces, and ROI reports.</p>
          </div>
          <button disabled className="w-full bg-slate-100 text-slate-400 font-medium text-xs py-2.5 rounded-xl cursor-not-allowed">Notify Me</button>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm opacity-70 relative flex flex-col justify-between">
          <span className="absolute top-4 right-4 bg-slate-100 text-slate-600 font-semibold tracking-wide text-[10px] uppercase px-2 py-0.5 rounded-md">Coming Soon</span>
          <div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 text-lg">🔌</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Integrations</h3>
            <p className="text-xs text-slate-500 leading-normal mb-6">Seamlessly interface and exchange data pipelines with third-party services.</p>
          </div>
          <button disabled className="w-full bg-slate-100 text-slate-400 font-medium text-xs py-2.5 rounded-xl cursor-not-allowed">Notify Me</button>
        </div>
      </div>
    </div>
  );
}
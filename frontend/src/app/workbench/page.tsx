'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

// Tools Data
const tools = [
  {
    id: 'assistant',
    name: 'AI Assistant',
    description: 'Chat with your AI assistant for help with tasks',
    isComingSoon: false,
  },
  {
    id: 'automation',
    name: 'Automation Builder',
    description: 'Create and manage automated workflows',
    isComingSoon: false,
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'View detailed analytics and reports',
    isComingSoon: true,
  },
  {
    id: 'integrations',
    name: 'Integrations',
    description: 'Connect with third-party services',
    isComingSoon: true,
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// ToolCard Component
function ToolCard({ tool }: { tool: (typeof tools)[0] }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className={cn('h-full flex flex-col', tool.isComingSoon && 'opacity-60')}>
        <CardContent className='flex flex-col h-full p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-2 rounded-lg bg-brand-navy/5 text-brand-navy'>
              <Icons.bot className='h-6 w-6' />
            </div>
            {tool.isComingSoon && (
              <span className='px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600'>
                Coming Soon
              </span>
            )}
          </div>
          <h3 className='font-semibold text-lg mb-2'>{tool.name}</h3>
          <p className='text-sm text-muted-foreground flex-1 mb-4'>{tool.description}</p>
          <Button
            variant={tool.isComingSoon ? 'outline' : 'default'}
            className='w-full'
            disabled={tool.isComingSoon}
          >
            {tool.isComingSoon ? 'Notify Me' : 'Open Tool'}
            {!tool.isComingSoon && <Icons.arrowRight className='ml-2 h-4 w-4' />}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Workbench Component
export default function WorkbenchPage() {
  const [niche, setNiche] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // ESLint bypass for Next.js strict typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [apiResponse, setApiResponse] = useState<any>(null);

  const runZyncEngine = async () => {
    if (!niche) return alert("Bhai, pehle Target Niche toh daalo!");
    setIsProcessing(true);
    setApiResponse(null);
    try {
      const res = await fetch('http://localhost:8001/api/marketing/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_niche: niche })
      });
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      // Use 'err' to prevent unused variable warning
      console.error("Zync Engine Error:", err); 
      setApiResponse({ status: "ERROR", message: "Backend Engine se contact nahi ho paya!" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className='space-y-8'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className='text-display-3 font-bold tracking-tight text-brand-navy'>
          Workbench
        </h1>
        <p className='mt-2 text-lg text-muted-foreground'>
          Access your AI tools and automation workflows.
        </p>
      </motion.div>

      {/* Zync Autonomous Marketing Engine Controller UI */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 my-6">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Zync Marketing Autonomous Pipeline</h2>
          <p className="text-sm text-muted-foreground">Apna campaign niche enter karke ek sath 4 powerful AI agents ko parallel trigger karo.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <input 
            type="text" 
            placeholder="e.g., Zync Studio / Amigos Cafeteria" 
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-800"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
          <Button onClick={runZyncEngine} disabled={isProcessing}>
            {isProcessing ? "Executing 4 Agents..." : "Run Zync Engine 🚀"}
          </Button>
        </div>

        {/* Live Agent Output Console */}
        {apiResponse && (
          <div className={`p-4 rounded-lg text-sm border ${apiResponse.status === 'ERROR' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
            <div className="font-semibold mb-1">
              Engine Status: {apiResponse.status || "SUCCESS 🔥"}
            </div>
            <pre className="mt-2 p-3 bg-slate-900 text-slate-100 rounded text-xs overflow-x-auto whitespace-pre-wrap font-mono">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Tools Grid */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </motion.div>
  );
}
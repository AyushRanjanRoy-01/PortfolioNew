import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-unbounded text-8xl md:text-9xl font-bold gradient-text mb-4">
            404
          </h1>
          <h2 className="font-unbounded text-2xl md:text-3xl text-[#E8E8ED] mb-4">
            Page Not Found
          </h2>
          <p className="text-[#A8A8B4] text-base md:text-lg leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <Button className="bg-[#00D4AA] text-[#0A0A0F] font-semibold px-6 py-3 rounded-full hover:bg-[#5EEAD4] transition-all glow-primary">
              <Home className="mr-2 w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-[#00D4AA] text-[#00D4AA] px-6 py-3 rounded-full hover:bg-[#00D4AA]/10 transition-all"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}

import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './styles/tokens.css'
import './styles/base.css'
import './styles/report.css'
import './styles/supply-chain.css'
import './styles/supply-chain-extra.css'
import './styles/agent-team.css'
import './styles/motion.css'
import './styles/print.css'

createRoot(document.getElementById('root')!).render(<App />)

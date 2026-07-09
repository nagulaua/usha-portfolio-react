// Central content store — edit these arrays to update the site.
// `category` on jobs/projects drives both the filter tabs and the accent color
// (see CATEGORY_COLORS in App.jsx / index.css).

export const jobs = [
  {
    dates: '06/2025 — Present',
    title: 'Software Engineer | Cloud',
    company: 'Weg Works · client: Albertsons Companies Inc.',
    bullets: [
      'Designed and maintained GCP infrastructure supporting enterprise applications with high availability and scalability.',
      'Built Infrastructure as Code with Terraform to provision Compute Engine, networking, and IAM policies.',
      'Automated CI/CD pipelines across Jenkins, GitHub Actions, and GitLab CI, cutting deployment time by over 60%.',
      'Managed GKE clusters for containerized microservices, improving deployment consistency and reducing downtime.',
      'Configured Cloud Monitoring, Prometheus, and Grafana dashboards to proactively track production workloads.',
      'Reduced infrastructure costs through rightsizing and automated scaling policies.',
    ],
  },
  {
    dates: '10/2022 — 01/2024',
    title: 'Cloud Engineer',
    company: 'Cognizant · client: Daimler Truck Financial Services',
    bullets: [
      'Supported migration of enterprise applications from on-premises environments to GCP and AWS.',
      'Built reusable Terraform modules to standardize provisioning across development and testing environments.',
      'Implemented containerized deployments with Docker and Kubernetes, improving portability and consistency.',
      'Configured secure networking — VPCs, firewall rules, VPN connectivity, IAM roles, and load balancers.',
      'Monitored production infrastructure with Cloud Monitoring and Grafana, reducing incident response time.',
    ],
  },
  {
    dates: '03/2022 — 09/2022',
    title: 'Cloud Engineer – Associate',
    company: 'Cognizant Technology Solutions',
    bullets: [
      'Developed CI/CD pipelines with Jenkins and GitHub to automate build, test, and deployment.',
      'Containerized enterprise applications with Docker for consistent deployment across environments.',
      'Automated Linux server administration tasks using Bash and Python scripting.',
      'Configured Git branching strategies and deployment workflows supporting Agile delivery.',
    ],
  },
];

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'cloud', label: 'Cloud Infrastructure' },
  { key: 'devops', label: 'DevOps' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'github', label: 'Open Source' },
];

export const projects = [
  {
    category: 'cloud',
    tag: 'Cloud Infrastructure',
    title: 'Enterprise Cloud Platform on GCP',
    desc: "Designed and maintained GCP infrastructure for Albertsons' enterprise applications via Weg Works.",
    impact: [
      'Cut deployment time by 60% through CI/CD automation',
      'Improved consistency across GKE-managed microservices',
      'Reduced infra costs via rightsizing and autoscaling',
    ],
    chips: ['Terraform', 'GKE', 'Jenkins', 'Cloud Monitoring'],
  },
  {
    category: 'cloud',
    tag: 'Cloud Infrastructure',
    title: 'On-Prem to Cloud Migration',
    desc: 'Led migration of enterprise applications from on-premises to GCP/AWS for Daimler Truck Financial Services via Cognizant.',
    impact: [
      'Standardized provisioning with reusable Terraform modules',
      'Improved portability via Docker/Kubernetes containerization',
      'Reduced incident response time via proactive Grafana monitoring',
    ],
    chips: ['Terraform', 'Docker', 'Kubernetes', 'AWS', 'GCP'],
  },
  {
    category: 'devops',
    tag: 'DevOps',
    title: 'CI/CD Pipeline Automation',
    desc: 'Built automated CI/CD pipelines and containerized deployments at Cognizant Technology Solutions.',
    impact: [
      'Automated build, test, and deploy with Jenkins and GitHub',
      'Standardized release workflows across Agile teams',
      'Reduced manual deployment effort with automation templates',
    ],
    chips: ['Jenkins', 'Docker', 'Bash', 'Python', 'Git'],
  },
  {
    category: 'ai',
    tag: 'AI / ML',
    title: 'Fine-Tuning Llama 2 with Medical Data',
    desc: 'Fine-tuned an open-source LLM for medical terminology and clinical tasks using curated healthcare datasets.',
    impact: [
      'Curated large-scale medical datasets for domain-specific fine-tuning',
      'Fine-tuned Llama 2 with Hugging Face Transformers',
      'Built pipelines for secure, efficient model deployment',
    ],
    chips: ['Llama 2', 'Hugging Face', 'Python', 'NLP'],
    link: 'https://github.com/nagulaua/llama2-medical-finetuning',
  },
  {
    category: 'github',
    tag: 'Open Source · GitHub',
    title: 'AI CloudOps Assistant',
    desc: 'An AI-powered assistant that chats about your AWS/GCP infrastructure, checks resource status, analyzes logs, and alerts on issues — from the CLI or a FastAPI server.',
    impact: [
      'Combined AWS + GCP status snapshot from a single command',
      'Claude-powered log analysis surfaces likely root cause automatically',
      'FastAPI server exposes the same functionality over HTTP with Swagger docs',
    ],
    chips: ['Python', 'Claude API', 'AWS', 'GCP', 'FastAPI'],
    link: 'https://github.com/nagulaua/AI-Cloudops-Assistant',
  },
  {
    category: 'github',
    tag: 'Open Source · GitHub',
    title: 'E-Commerce Microservices on GKE',
    desc: 'Cloud-native e-commerce platform: 4 Spring Boot microservices on GKE, fully provisioned as code with Terraform.',
    impact: [
      'Provisioned GKE, Cloud SQL, Pub/Sub, and Secret Manager entirely via Terraform',
      'Verified end-to-end: JWT auth, order events, and CI/CD via Workload Identity Federation',
      'Prometheus/Grafana confirmed scraping live metrics across all 4 services',
    ],
    chips: ['Java', 'Spring Boot', 'Terraform', 'GKE', 'Pub/Sub', 'GitHub Actions'],
    link: 'https://github.com/nagulaua/ecommerce-microservices-gcp-1',
  },
];

export const skillGroups = [
  {
    label: 'Cloud Platforms',
    chips: ['AWS EC2', 'S3', 'Lambda', 'RDS', 'IAM', 'VPC', 'CloudFormation', 'GCP Compute Engine', 'GKE', 'Cloud Run', 'Cloud SQL', 'Azure AKS', 'Azure Functions'],
  },
  {
    label: 'CI/CD & DevOps',
    chips: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'JFrog Artifactory', 'Maven', 'Gradle'],
  },
  {
    label: 'Containers & Orchestration',
    chips: ['Docker', 'Kubernetes', 'EKS', 'GKE', 'AKS', 'Helm'],
  },
  {
    label: 'Infrastructure as Code',
    chips: ['Terraform', 'CloudFormation', 'Infra Automation'],
  },
  {
    label: 'Networking & Security',
    chips: ['VPC', 'IAM', 'Load Balancers', 'VPN', 'DNS', 'SSL/TLS', 'Security Groups', 'Firewall Rules', 'Secrets Mgmt'],
  },
  {
    label: 'Monitoring & Observability',
    chips: ['Prometheus', 'Grafana', 'CloudWatch', 'Cloud Monitoring', 'Cloud Logging', 'ELK Stack'],
  },
  {
    label: 'Databases & Storage',
    chips: ['MySQL', 'PostgreSQL', 'MongoDB', 'Cloud SQL', 'RDS', 'Redis'],
  },
  {
    label: 'Version Control & Collaboration',
    chips: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence'],
  },
  {
    label: 'Programming & Scripting',
    chips: ['Python', 'Bash', 'Java', 'Shell Scripting'],
  },
  {
    label: 'Operating Systems',
    chips: ['Ubuntu', 'CentOS', 'RHEL', 'Windows'],
  },
];

export const certifications = [
  'GCP Professional Cloud Developer',
  'GCP Professional Cloud DevOps Engineer',
  'PegaAcademy Certified Senior System Architect (PCSSA 8.8)',
  'PegaAcademy Certified System Architect (PCSA 8.8)',
];

export const education = {
  school: 'University of Cincinnati',
  degree: 'Master of Science in Information Technology',
  dates: '01/2024 — 05/2025',
  meta: 'GPA 4.0/4.0 · Cincinnati, OH',
  coursework: ['IT Infrastructure Sustainability', 'AI & ML', 'Software Development', 'Human-Computer Interaction'],
};

export const contact = {
  email: 'nagulaua.ww@gmail.com',
  phone: '+1 513-546-4705',
  phoneHref: '+15135464705',
  location: 'Cincinnati, OH',
  linkedin: 'https://www.linkedin.com/in/usha-n-969246176',
  github: 'https://github.com/nagulaua',
  resume: `${import.meta.env.BASE_URL}UshaN_Resume.pdf`,
};

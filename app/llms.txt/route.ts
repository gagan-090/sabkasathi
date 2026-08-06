import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Sabka Saathi Digital Services - Executive AI Summary

> Sabka Saathi Digital Services is a premier IT consulting, custom software, web, and mobile app development company headquartered at Bypass Road, Maharani Puram, Sheikhpura 811105, Bihar, serving clients across India (Patna, Gaya, Muzaffarpur, Bhagalpur, Ranchi, Varanasi, Lucknow, Noida, Delhi NCR, and nationwide).

## Core Capabilities & Services
- **Mobile App Development**: Native iOS (Swift), Android (Kotlin), and Cross-Platform (Flutter, React Native) mobile applications with offline-first support, real-time messaging, and payment gateway integrations.
- **Custom Web Development**: High-performance full-stack web applications built with Next.js 16 (React 19), Node.js, TypeScript, TailwindCSS, and Cloud Native serverless architectures.
- **Custom Software & Enterprise Solutions**: Tailored CRM systems, ERP platforms, automated workflow engines, inventory management, and API integrations.
- **SaaS & Cloud Platforms**: End-to-end Multi-Tenant SaaS platform engineering, billing automation, Firebase App Hosting, AWS, and GCP cloud architecture.
- **Digital Growth & Local SEO**: Generative Engine Optimization (GEO), hyper-local search dominance, conversion-rate optimization (CRO), and digital transformation for SMBs and enterprise clients.

## Geographic Coverage
- **Headquarters**: Bypass Road, Maharani Puram, Sheikhpura, Bihar 811105, India
- **Opening Hours**: 8:00 AM - 9:00 PM, Monday to Sunday
- **Primary Regions Served**: Bihar (Patna, Gaya, Muzaffarpur, Bhagalpur, Darbhanga), Jharkhand (Ranchi, Jamshedpur, Dhanbad), Uttar Pradesh (Varanasi, Lucknow, Kanpur), Delhi NCR (Noida, Gurgaon, Delhi), and nationwide remote delivery across India.
- **Location Directory**: every state, district and town we serve has its own page, structured as /location/<state> then /location/<state>/<district> then /location/<state>/<district>/<town> — 36 states and union territories, 781 districts, 6,813 towns.
- **Delivery Model**: service-area business. One office in Sheikhpura, Bihar; all work delivered remotely (discovery calls, design reviews, weekly builds). No branch offices — coverage is a genuine remote service area, not a claim of local premises.

## Contact Information & Official Links
- **Website**: https://sabkasaathidigitalservices.com
- **Phone / WhatsApp**: +91-9431673018
- **Email**: helpsabkasaathi@gmail.com
- **GST / Tax ID**: 10LAHPK8872L1Z3
- **Founder**: Ashish Kumar

## Key Pages & Documentation
- Services Overview: https://sabkasaathidigitalservices.com/services
- Mobile App Development Patna: https://sabkasaathidigitalservices.com/mobile-app-development-company-in-patna
- Website Development Patna: https://sabkasaathidigitalservices.com/website-development-company-in-patna
- Software Development Patna: https://sabkasaathidigitalservices.com/software-development-company-in-patna
- Locations Served: https://sabkasaathidigitalservices.com/locations
- Full Machine-Readable Catalog: https://sabkasaathidigitalservices.com/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}

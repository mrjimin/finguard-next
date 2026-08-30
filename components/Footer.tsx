import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

const serviceLinks = [
    {
        href: "/analyze",
        label: "금융사기 분석",
    },
    {
        href: "/#how-it-works",
        label: "서비스 안내",
    },
];

const guardLinks = [
    {
        href: "/#why",
        label: "왜 필요한가",
    },
    {
        href: "/#response",
        label: "대응 방법",
    },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="site-footer__top">
                    <div className="site-footer__brand-area">
                        <Link
                            href="/"
                            className="site-footer__brand"
                        >
                            <span className="site-footer__brand-mark">
                                F
                            </span>

                            <span>FIN:GUARD</span>
                        </Link>

                        <p className="site-footer__description">
                            의심되는 금융 연락을 한 번 더 확인하고, <br />
                            필요한 대응 방법을 안내하는 AI 금융 보안 서비스입니다.
                        </p>
                    </div>

                    <div className="site-footer__links">
                        <FooterGroup
                            title="SERVICE"
                            links={serviceLinks}
                        />

                        <FooterGroup
                            title="FIN:GUARD"
                            links={guardLinks}
                        />
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <span>
                        © {CURRENT_YEAR} FIN:GUARD · All rights reserved.
                    </span>

                    <span>
                        AI 금융 보안 서비스
                    </span>
                </div>
            </div>
        </footer>
    );
}

interface FooterGroupProps {
    title: string;
    links: {
        href: string;
        label: string;
    }[];
}

function FooterGroup({
                         title,
                         links,
                     }: FooterGroupProps) {
    return (
        <div className="site-footer__group">
            <span className="site-footer__group-title">
                {title}
            </span>

            <div className="site-footer__group-links">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

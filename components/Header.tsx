import Link from "next/link";
import Image from "next/image";

const navigation = [
    { href: "/#why", label: "WHY" },
    { href: "/#check", label: "CHECK" },
    { href: "/#analyze", label: "ANALYZE" },
    { href: "/#response", label: "RESPONSE" },
    { href: "/history", label: "HISTORY" },
];

export default function Header() {
    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <Link
                    href="/"
                    className="site-logo"
                    aria-label="FIN:GUARD 홈"
                >
                    <span className="site-logo__mark">
                        <Image
                            src="/shield-lock.svg"
                            alt=""
                            width={24}
                            height={24}
                            aria-hidden="true"
                        />
                    </span>

                    <span>FIN:GUARD</span>
                </Link>

                <nav
                    className="site-nav"
                    aria-label="메인 메뉴"
                >
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="/#start"
                    className="site-header__action"
                >
                    <span>직접 확인하기</span>
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </header>
    );
}

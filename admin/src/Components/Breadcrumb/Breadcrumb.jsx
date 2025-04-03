import { useLocation, Link, NavLink } from "react-router-dom";

export default function Breadcrumb() {
    const { pathname } = useLocation();
    const path = pathname.split('/').filter((x) => x);
    let breacrumbs = "";

    if (path.includes('signin') || path.includes('signup')) return null

    return (
        
        <nav className="flex flex-wrap items-center text-sm text-gray-500 py-0 px-4 lg:mx-8 md:px-6 w-full max-w-screen-xl mx-auto">

            {path.length > 0 && (
                <Link to="/admin" className="hover:text-orange-500 transition underline font-medium">Home</Link>
            )
            }

            {path?.map((name, index) => {

                breacrumbs += `/${name}`;
                const isLast = index === path.length - 1;

                return (
                    <span key={breacrumbs} className="flex items-center">
                        <span className="mx-2 text-gray-500">/</span>
                        {isLast ? (
                            <span className="text-black font-semibold capitalize">{name}</span>
                        ) : (
                            <NavLink
                                to={breacrumbs}
                                className={({ isActive }) =>
                                    `${isActive ? "text-black underline font-semibold" : "text-gray-600"} capitalize hover:text-orange-500 transition`
                                }
                            >
                                {name}
                            </NavLink>
                        )}
                    </span>
                );
            })}
        </nav>

    );
}

import { useLocation, Link, NavLink } from "react-router-dom";

export default function Breadcrumb() {
    const { pathname } = useLocation();
    const path = pathname.split('/').filter(Boolean);
    let breacrumbs = "";

    if (path.includes('signin') || path.includes('signup')) return null

    return (
        
        <nav className="flex flex-wrap items-center text-sm text-gray-500 py-10 -mb-10 px-4 lg:px-4 md:px-8 w-full max-w-screen-xl mx-auto">

            {path.length > 0 && (
                <Link to="/" className="hover:text-[#DB4444] transition font-bold">Home</Link>
            )
            }

            {path?.map((name, index) => {

                breacrumbs += `/${name}`;
                const isLast = index === path.length - 1;

                return (
                    <span key={breacrumbs} className="flex items-center">
                        <span className="mx-2 text-gray-500">/</span>
                        {isLast ? (
                            <span className="text-black font-semibold capitalize">{name.replaceAll('_',' ')}</span>
                        ) : (
                            <NavLink
                                to={breacrumbs}
                                className={({ isActive }) =>
                                    `${isActive ? "text-gray-500 font-bold" : "text-gray-600"} capitalize hover:text-[#DB4444] transition`
                                }
                            >
                                {name.replaceAll('_',' ')}
                            </NavLink>
                        )}
                    </span>
                );
            })}
        </nav>

    );
}

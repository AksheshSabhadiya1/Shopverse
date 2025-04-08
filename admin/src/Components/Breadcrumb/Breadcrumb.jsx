import { useLocation, Link, NavLink } from "react-router-dom";

export default function Breadcrumb() {
    const { pathname } = useLocation();

    const path = pathname.split('/').filter(Boolean);

    const breadcrumbs = path.map((segment, index) => {
        const url = `/${path.slice(0, index + 1).join('/')}`;
        const isLast = index === path.length - 1;

        const labelMap = {
            admin: "Dashboard",
            products: "Products",
            addproduct: "Add Product",
            editproduct: "Edit Product",
            users: "Users",
            approveduser: "Approved Users",
            notapproveduser: "Not Approved Users",
        };

        const label = labelMap[segment.toLowerCase()] || segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

        return (
            <span key={url} className="flex items-center">
                <span className="mx-2 text-gray-500">/</span>
                {isLast ? (
                    <span className="text-black font-semibold capitalize">{label}</span>
                ) : (
                    <NavLink
                        to={url}
                        className={({ isActive }) =>
                            `${isActive ? "text-gray-500 underline font-semibold" : "text-gray-600"} capitalize hover:text-orange-500 transition`
                        }
                    >
                        {label}
                    </NavLink>
                )}
            </span>
        );
    });

    return (
        <nav className="flex flex-wrap items-center text-sm text-gray-500 py-0 px-4 lg:mx-8 md:px-6 w-full max-w-screen-xl mx-auto">
            <Link to="/admin" className="hover:text-orange-500 transition underline font-medium">
                Home
            </Link>
            {breadcrumbs}
        </nav>
    );
}

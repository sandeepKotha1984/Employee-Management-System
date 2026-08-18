import {
	createContext,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

export type AuthUser = {
	id: number;
	name: string;
	email: string;
	role: string;
};

type AuthContextType = {
	user: AuthUser | null;
	isAuthenticated: boolean;
	login: (user: AuthUser) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: Boolean(user),
			login: (nextUser: AuthUser) => setUser(nextUser),
			logout: () => setUser(null),
		}),
		[user]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};

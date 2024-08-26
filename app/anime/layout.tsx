import Header from "./components/Header";
export default function AnimeLayout({children} : {children: React.ReactNode}) {
    return (
        <> 
            <Header/>
            {children}
        </>
    )
}
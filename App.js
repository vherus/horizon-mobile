import 'react-native-gesture-handler'
import { DataProvider } from './src/context/DataContext'
import Navigation from './src/routing/Navigation'

export default function App() {
    return (
        <DataProvider>
            <Navigation />
        </DataProvider>
    )
}

import 'react-native-gesture-handler'
import Navigation from './src/Navigation'
import { DataProvider } from './src/context/DataContext'

export default function App() {
    return (
        <DataProvider>
            <Navigation />
        </DataProvider>
    )
}

import { registerRootComponent } from 'expo';
import './utils/polyfills'; // Import here first
import AppInit from './AppInit';

// Register the root component
registerRootComponent(AppInit);

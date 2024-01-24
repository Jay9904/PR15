import React from 'react'

export default function FirstLettercapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

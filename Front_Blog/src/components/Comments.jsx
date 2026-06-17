import React from 'react'

export const Comments = ({ data }) => {
    const { _id, content, authorName, createdAt } = data

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };


    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">{authorName}</h3>
                <p className="text-gray-700 text-sm mb-2">{formatDate(createdAt)}</p>
                <p className="text-gray-700">{content}</p>
            </div>
        </>
    )
}
